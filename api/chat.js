const OpenAI = require("openai");
const { buildSystemPrompt } = require("../lib/knowledge");
const { checkRateLimit } = require("../lib/rate-limit");
const { TOOL_DEFINITIONS, executeTool } = require("../lib/calendly");

const ALLOWED_ORIGINS = [
    "https://billyhsun.github.io",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
];

function setCors(req, res) {
    const origin = req.headers.origin || "";
    if (ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".github.io")) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Vary", "Origin");
}

async function runToolLoop(openai, messages, timezone) {
    const maxIterations = 5;
    let currentMessages = messages.slice();

    for (let i = 0; i < maxIterations; i++) {
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: currentMessages,
            tools: TOOL_DEFINITIONS,
            tool_choice: "auto",
        });

        const choice = completion.choices[0];
        const message = choice.message;

        if (message.tool_calls && message.tool_calls.length > 0) {
            currentMessages.push(message);

            for (const toolCall of message.tool_calls) {
                const fn = toolCall.function;
                let args = {};
                try {
                    args = JSON.parse(fn.arguments || "{}");
                } catch {
                    args = {};
                }

                let result;
                try {
                    result = await executeTool(fn.name, args, timezone);
                } catch (err) {
                    result = { success: false, error: err.message };
                }

                currentMessages.push({
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: JSON.stringify(result),
                });
            }
            continue;
        }

        return message.content || "I'm not sure how to help with that.";
    }

    return "I had trouble completing that request. Please try again or email Bill directly.";
}

async function streamResponse(openai, messages, timezone, res) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const maxIterations = 5;
    let currentMessages = messages.slice();

    for (let i = 0; i < maxIterations; i++) {
        const stream = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: currentMessages,
            tools: TOOL_DEFINITIONS,
            tool_choice: "auto",
            stream: true,
        });

        let toolCalls = {};
        let finishReason = null;
        let hasContent = false;

        for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta;
            finishReason = chunk.choices[0]?.finish_reason || finishReason;

            if (delta?.content) {
                hasContent = true;
                res.write("data: " + JSON.stringify({ content: delta.content }) + "\n\n");
            }

            if (delta?.tool_calls) {
                for (const tc of delta.tool_calls) {
                    const idx = tc.index;
                    if (!toolCalls[idx]) {
                        toolCalls[idx] = { id: "", type: "function", function: { name: "", arguments: "" } };
                    }
                    if (tc.id) toolCalls[idx].id = tc.id;
                    if (tc.function?.name) toolCalls[idx].function.name += tc.function.name;
                    if (tc.function?.arguments) toolCalls[idx].function.arguments += tc.function.arguments;
                }
            }
        }

        const toolCallList = Object.values(toolCalls);
        if (finishReason === "tool_calls" && toolCallList.length > 0) {
            const assistantMessage = {
                role: "assistant",
                content: hasContent ? null : null,
                tool_calls: toolCallList.map(function (tc) {
                    return {
                        id: tc.id,
                        type: "function",
                        function: { name: tc.function.name, arguments: tc.function.arguments },
                    };
                }),
            };
            currentMessages.push(assistantMessage);

            for (const toolCall of toolCallList) {
                let args = {};
                try {
                    args = JSON.parse(toolCall.function.arguments || "{}");
                } catch {
                    args = {};
                }

                let result;
                try {
                    result = await executeTool(toolCall.function.name, args, timezone);
                } catch (err) {
                    result = { success: false, error: err.message };
                }

                currentMessages.push({
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: JSON.stringify(result),
                });
            }
            continue;
        }

        res.write("data: [DONE]\n\n");
        res.end();
        return;
    }

    res.write(
        "data: " +
            JSON.stringify({
                content:
                    "\n\nI had trouble completing that. Please try again or book at https://calendly.com/billyhsun/30min.",
            }) +
            "\n\n"
    );
    res.write("data: [DONE]\n\n");
    res.end();
}

module.exports = async function handler(req, res) {
    setCors(req, res);

    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const rate = checkRateLimit(req);
    if (!rate.allowed) {
        return res.status(429).json({
            error: "Too many requests. Please try again in an hour or email Bill directly.",
        });
    }

    if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({ error: "Chat service is not configured." });
    }

    let body;
    try {
        body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    } catch {
        return res.status(400).json({ error: "Invalid JSON body" });
    }

    const userMessages = body.messages;
    const timezone = body.timezone || "America/Toronto";

    if (!Array.isArray(userMessages) || userMessages.length === 0) {
        return res.status(400).json({ error: "messages array is required" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const systemPrompt = buildSystemPrompt(timezone);
    const messages = [{ role: "system", content: systemPrompt }, ...userMessages];

    const wantsStream = body.stream !== false;

    try {
        if (wantsStream) {
            await streamResponse(openai, messages, timezone, res);
            return;
        }

        const reply = await runToolLoop(openai, messages, timezone);
        return res.status(200).json({ message: reply });
    } catch (err) {
        console.error("Chat API error:", err);
        if (!res.headersSent) {
            return res.status(500).json({ error: "Failed to generate response." });
        }
        res.write("data: " + JSON.stringify({ error: err.message }) + "\n\n");
        res.end();
    }
};
