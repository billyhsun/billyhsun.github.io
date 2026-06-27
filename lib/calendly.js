const CALENDLY_LINK =
    process.env.CALENDLY_BOOKING_LINK || "https://calendly.com/billyhsun/30min";

const TOOL_DEFINITIONS = [
    {
        type: "function",
        function: {
            name: "get_booking_link",
            description:
                "Return Bill's Calendly booking link when the user wants to schedule a meeting, mentorship call, or chat with Bill.",
            parameters: {
                type: "object",
                properties: {},
            },
        },
    },
];

async function executeTool(name) {
    if (name === "get_booking_link") {
        return {
            success: true,
            booking_link: CALENDLY_LINK,
            message:
                "Share this link with the user so they can pick a time for a free 30-minute call: " +
                CALENDLY_LINK,
        };
    }
    return { error: "Unknown tool: " + name };
}

module.exports = {
    TOOL_DEFINITIONS,
    executeTool,
    CALENDLY_LINK,
};
