"use strict";

(function () {
    var CHAT_API_URL =
        (document.querySelector('meta[name="chat-api-url"]') || {}).content ||
        "http://localhost:3000/api/chat";
    var STORAGE_KEY = "bill-chat-state";
    var WELCOME_MESSAGE =
        "Hi! I'm Bill's assistant. Ask me about his experience, research, projects, or mentorship — or say you'd like to book a call and I'll share his Calendly link.";

    function loadStoredState() {
        try {
            var raw = sessionStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            var data = JSON.parse(raw);
            if (!data || !Array.isArray(data.messages)) return null;
            return data;
        } catch (err) {
            return null;
        }
    }

    function newSessionId() {
        return "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
    }

    function escapeHtml(text) {
        return String(text || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function stripHtmlArtifacts(text) {
        return String(text || "")
            .replace(/<a\s+[^>]*>/gi, "")
            .replace(/<\/a>/gi, "")
            .replace(/<[^>]+>/g, "")
            .replace(/"\s*target\s*=\s*["'][^"']*["']\s*rel\s*=\s*["'][^"']*["']\s*>/gi, "")
            .replace(/"\s*target\s*=\s*["'][^"']*["']\s*>/gi, "")
            .trim();
    }

    function formatMessage(text, finalize) {
        var clean = stripHtmlArtifacts(text);
        var escaped = escapeHtml(clean);

        if (!finalize) {
            return escaped.replace(/\n/g, "<br>");
        }

        // Markdown links: [label](url)
        escaped = escaped.replace(
            /\[([^\]]+)\]\((https?:\/\/[^\s")]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // Calendly booking link with friendly label
        escaped = escaped.replace(
            /https?:\/\/calendly\.com\/billyhsun\/30min/g,
            '<a class="bill-chat-cta" href="https://calendly.com/billyhsun/30min" target="_blank" rel="noopener noreferrer">Book a 30-minute call</a>'
        );

        // Bold: **text** or __text__
        escaped = escaped.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
        escaped = escaped.replace(/__([^_\n]+)__/g, "<strong>$1</strong>");

        // Inline code: `code`
        escaped = escaped.replace(/`([^`\n]+)`/g, "<code>$1</code>");

        // Other bare URLs (stop before quotes or angle brackets)
        escaped = escaped.replace(
            /(^|[^\w/"'=])(https?:\/\/[^\s"<]+)/g,
            '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>'
        );

        // Internal site paths: /pages/about.html
        escaped = escaped.replace(
            /(^|[^\w/"'=])(\/[a-zA-Z0-9_\-./]*\.html)/g,
            '$1<a href="$2">$2</a>'
        );

        // Bullet lines: "- item"
        escaped = escaped.replace(/^- (.+)$/gm, '<span class="bill-chat-bullet">• $1</span>');

        return escaped.replace(/\n/g, "<br>");
    }

    class BillChat extends HTMLElement {
        constructor() {
            super();
            var stored = loadStoredState();
            this.isOpen = !!(stored && stored.isOpen);
            this.isLoading = false;
            this.messages = stored && stored.messages ? stored.messages.slice() : [];
            this.sessionId = (stored && stored.sessionId) || newSessionId();
        }

        persistState() {
            try {
                sessionStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({
                        sessionId: this.sessionId,
                        messages: this.messages,
                        isOpen: this.isOpen,
                    })
                );
            } catch (err) {
                // sessionStorage may be unavailable in some browsers/modes
            }
        }

        connectedCallback() {
            if (this._initialized) return;
            this._initialized = true;
            this.render();
            this.bindEvents();
            if (this.messages.length) {
                this.restoreMessages();
                if (this.isOpen) {
                    this.setOpen(true);
                }
            } else {
                this.addBotMessage(WELCOME_MESSAGE);
            }
        }

        restoreMessages() {
            var self = this;
            this.messagesEl.innerHTML = "";
            this.messages.forEach(function (message) {
                var role = message.role === "user" ? "user" : "bot";
                self.renderMessageEl(role, message.content);
            });
            this.scrollToBottom();
        }

        render() {
            this.innerHTML =
                '<div class="bill-chat-root">' +
                '  <div class="bill-chat-panel" id="bill-chat-panel" role="dialog" aria-label="Chat with Bill\'s assistant">' +
                '    <div class="bill-chat-header">' +
                '      <div>' +
                '        <h2>Chat with Bill\'s Assistant</h2>' +
                '        <p>Ask me questions</p>' +
                "      </div>" +
                '      <button type="button" class="bill-chat-close" aria-label="Close chat"><i class="fas fa-times"></i></button>' +
                "    </div>" +
                '    <div class="bill-chat-messages" id="bill-chat-messages"></div>' +
                '    <div class="bill-chat-input-area">' +
                '      <textarea class="bill-chat-input" id="bill-chat-input" rows="1" placeholder="Ask a question…" aria-label="Message"></textarea>' +
                '      <button type="button" class="bill-chat-send" id="bill-chat-send" aria-label="Send message"><i class="fas fa-paper-plane"></i></button>' +
                "    </div>" +
                "  </div>" +
                '  <button type="button" class="bill-chat-toggle" id="bill-chat-toggle" aria-label="Ask me" aria-expanded="false">' +
                '    <i class="fas fa-comment-dots"></i>' +
                '    <span class="bill-chat-toggle-label">Ask me</span>' +
                "  </button>" +
                "</div>";

            this.panel = this.querySelector("#bill-chat-panel");
            this.messagesEl = this.querySelector("#bill-chat-messages");
            this.input = this.querySelector("#bill-chat-input");
            this.sendBtn = this.querySelector("#bill-chat-send");
            this.toggleBtn = this.querySelector("#bill-chat-toggle");
            this.closeBtn = this.querySelector(".bill-chat-close");
        }

        bindEvents() {
            var self = this;
            this.toggleBtn.addEventListener("click", function () {
                self.setOpen(!self.isOpen);
            });
            this.closeBtn.addEventListener("click", function () {
                self.setOpen(false);
            });
            this.sendBtn.addEventListener("click", function () {
                self.sendMessage();
            });
            this.input.addEventListener("keydown", function (e) {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    self.sendMessage();
                }
            });
        }

        updateToggleContent(open) {
            this.toggleBtn.innerHTML = open
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-comment-dots"></i><span class="bill-chat-toggle-label">Ask me</span>';
            this.toggleBtn.setAttribute("aria-label", open ? "Close chat" : "Ask me");
        }

        setOpen(open) {
            this.isOpen = open;
            this.panel.classList.toggle("is-open", open);
            this.toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
            this.updateToggleContent(open);
            this.persistState();
            if (open) {
                this.input.focus();
                this.scrollToBottom();
            }
        }

        openChat() {
            this.setOpen(true);
        }

        addUserMessage(text) {
            this.messages.push({ role: "user", content: text });
            this.renderMessageEl("user", text);
            this.persistState();
        }

        addBotMessage(text) {
            this.messages.push({ role: "assistant", content: text });
            this.renderMessageEl("bot", text);
            this.persistState();
        }

        renderMessageEl(role, text) {
            var el = document.createElement("div");
            el.className = "bill-chat-message bill-chat-message--" + role;
            el.innerHTML = formatMessage(text, true);
            this.messagesEl.appendChild(el);
            this.scrollToBottom();
            return el;
        }

        appendMessageEl(role, text) {
            return this.renderMessageEl(role, text);
        }

        showTyping() {
            var el = document.createElement("div");
            el.className = "bill-chat-message bill-chat-message--bot";
            el.id = "bill-chat-typing";
            el.innerHTML =
                '<span class="bill-chat-typing"><span></span><span></span><span></span></span>';
            this.messagesEl.appendChild(el);
            this.scrollToBottom();
        }

        hideTyping() {
            var el = this.querySelector("#bill-chat-typing");
            if (el) el.remove();
        }

        scrollToBottom() {
            if (this.messagesEl) {
                this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
            }
        }

        setLoading(loading) {
            this.isLoading = loading;
            this.sendBtn.disabled = loading;
            this.input.disabled = loading;
        }

        async sendMessage() {
            var text = this.input.value.trim();
            if (!text || this.isLoading) return;

            this.input.value = "";
            this.addUserMessage(text);
            this.setLoading(true);
            this.showTyping();

            var apiMessages = this.messages
                .filter(function (m) {
                    return m.role === "user" || m.role === "assistant";
                })
                .map(function (m) {
                    return { role: m.role, content: m.content };
                });

            try {
                var response = await fetch(CHAT_API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        messages: apiMessages,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        sessionId: this.sessionId,
                    }),
                });

                this.hideTyping();

                if (!response.ok) {
                    var errBody = await response.json().catch(function () {
                        return {};
                    });
                    throw new Error(errBody.error || "Request failed (" + response.status + ")");
                }

                var contentType = response.headers.get("content-type") || "";
                if (contentType.indexOf("text/event-stream") !== -1) {
                    await this.handleStream(response);
                } else {
                    var data = await response.json();
                    this.addBotMessage(data.message || data.content || "No response.");
                }
            } catch (err) {
                this.hideTyping();
                this.addBotMessage(
                    "Sorry, I couldn't reach the assistant right now. You can email Bill at billyuanhong.sun@mail.utoronto.ca or [book a call](https://calendly.com/billyhsun/30min)."
                );
                console.error("Chat error:", err);
            }

            this.setLoading(false);
        }

        async handleStream(response) {
            var reader = response.body.getReader();
            var decoder = new TextDecoder();
            var buffer = "";
            var botEl = this.appendMessageEl("bot", "");
            var fullText = "";

            while (true) {
                var result = await reader.read();
                if (result.done) break;

                buffer += decoder.decode(result.value, { stream: true });
                var lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (line.indexOf("data: ") !== 0) continue;
                    var payload = line.slice(6).trim();
                    if (payload === "[DONE]") continue;
                    try {
                        var parsed = JSON.parse(payload);
                        if (parsed.content) {
                            fullText += parsed.content;
                            botEl.innerHTML = formatMessage(fullText, false);
                            this.scrollToBottom();
                        }
                        if (parsed.error) {
                            throw new Error(parsed.error);
                        }
                    } catch (parseErr) {
                        if (parseErr.message && parseErr.message !== "Unexpected end of JSON input") {
                            throw parseErr;
                        }
                    }
                }
            }

            botEl.innerHTML = formatMessage(fullText, true);
            this.messages.push({ role: "assistant", content: fullText });
            this.persistState();
        }
    }

    customElements.define("bill-chat", BillChat);

    function injectChatAssets() {
        if (!document.querySelector('link[href*="chat-widget.css"]')) {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "/assets/css/chat-widget.css";
            document.head.appendChild(link);
        }
        if (!document.querySelector("bill-chat")) {
            var chat = document.createElement("bill-chat");
            document.body.appendChild(chat);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectChatAssets);
    } else {
        injectChatAssets();
    }

    window.openBillChat = function () {
        var chat = document.querySelector("bill-chat");
        if (chat) chat.openChat();
    };
})();
