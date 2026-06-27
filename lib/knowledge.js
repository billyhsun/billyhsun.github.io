const fs = require("fs");
const path = require("path");

let cachedKnowledge = null;

function loadKnowledge() {
    if (cachedKnowledge) return cachedKnowledge;
    const filePath = path.join(__dirname, "..", "data", "site-knowledge.json");
    const raw = fs.readFileSync(filePath, "utf8");
    cachedKnowledge = JSON.parse(raw);
    return cachedKnowledge;
}

function buildSystemPrompt(timezone) {
    const knowledge = loadKnowledge();
    const tz = timezone || "America/Toronto";
    const calendlyLink = process.env.CALENDLY_BOOKING_LINK || "https://calendly.com/billyhsun/30min";

    return (
        "You are a helpful assistant on Bill Sun's personal portfolio website (billyhsun.github.io). " +
        "Answer questions about Bill's background, experience, research, publications, projects, extracurriculars, blog, and mentorship offerings.\n\n" +
        "RULES:\n" +
        "- Only answer using the SITE KNOWLEDGE below. If you don't know, say so and suggest emailing billyuanhong.sun@mail.utoronto.ca or booking a call.\n" +
        "- Be concise, friendly, and professional. Use short paragraphs.\n" +
        "- Use plain text formatting only: no markdown asterisks or underscores. For emphasis, just write clearly.\n" +
        "- For lists, start each item on its own line with '- ' (dash space).\n" +
        "- When relevant, mention page paths like /pages/about.html so users can read more.\n" +
        "- For meeting or mentorship requests, call the get_booking_link tool and share the Calendly URL with the user.\n" +
        "- Put the booking URL on its own line as plain text only (no HTML, no markdown, no angle brackets). Example:\n" +
        "  https://calendly.com/billyhsun/30min\n" +
        "- Say it is a free 30-minute consulting call and they can pick any available time.\n" +
        "- Do not attempt to book meetings yourself or ask for name/email to schedule — booking happens on Calendly.\n" +
        "- Visitor timezone for context: " +
        tz +
        ".\n" +
        "- Never invent facts not in the knowledge base.\n\n" +
        "SITE KNOWLEDGE:\n" +
        knowledge.knowledgeText
    );
}

module.exports = { loadKnowledge, buildSystemPrompt };
