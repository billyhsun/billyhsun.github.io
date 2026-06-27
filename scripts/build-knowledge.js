#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PAGES_DIR = path.join(ROOT, "pages");
const STYLES_JS = path.join(ROOT, "assets", "js", "styles.js");
const OUTPUT = path.join(ROOT, "data", "site-knowledge.json");

function htmlToText(html) {
    return html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<main-header[^>]*>[\s\S]*?<\/main-header[^>]*>/gi, " ")
        .replace(/<main-footer[^>]*>[\s\S]*?<\/main-footer[^>]*>/gi, " ")
        .replace(/<publications-list[^>]*><\/publications-list>/gi, " ")
        .replace(/<skills-board[^>]*><\/skills-board>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#\d+;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function extractTitle(html) {
    const match = html.match(/<title>([^<]+)<\/title>/i);
    return match ? match[1].trim() : "";
}

function extractMetaDescription(html) {
    const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    return match ? match[1].trim() : "";
}

function extractPublications(stylesContent) {
    const match = stylesContent.match(/var PUBLICATION_ENTRIES = (\[[\s\S]*?\n\]);/);
    if (!match) return [];
    try {
        // eslint-disable-next-line no-eval
        return eval(match[1]);
    } catch {
        return [];
    }
}

function extractSkills(stylesContent) {
    const match = stylesContent.match(/var SKILL_COLUMNS = (\[[\s\S]*?\n\]);/);
    if (!match) return [];
    try {
        // eslint-disable-next-line no-eval
        return eval(match[1]);
    } catch {
        return [];
    }
}

function collectHtmlPages() {
    const pages = [];
    const indexPath = path.join(ROOT, "index.html");
    if (fs.existsSync(indexPath)) {
        const html = fs.readFileSync(indexPath, "utf8");
        pages.push({
            path: "/index.html",
            title: extractTitle(html),
            description: extractMetaDescription(html),
            content: htmlToText(html),
        });
    }

    if (fs.existsSync(PAGES_DIR)) {
        for (const file of fs.readdirSync(PAGES_DIR).sort()) {
            if (!file.endsWith(".html")) continue;
            const filePath = path.join(PAGES_DIR, file);
            const html = fs.readFileSync(filePath, "utf8");
            pages.push({
                path: "/pages/" + file,
                title: extractTitle(html),
                description: extractMetaDescription(html),
                content: htmlToText(html),
            });
        }
    }
    return pages;
}

function buildKnowledgeText(pages, publications, skills) {
    const sections = [];

    sections.push(
        "SITE: Bill Sun portfolio at https://billyhsun.github.io\n" +
            "Bill (Yuan Hong Sun) is an AI, Machine Learning, and Software Engineer at Guidepoint. " +
            "Previously at Kinaxis and Nuralogix. M.S. Computer Science (Georgia Tech), " +
            "M.A. Applied Psychology and B.Eng Engineering Science — Machine Intelligence (University of Toronto).\n" +
            "Contact: billyuanhong.sun@mail.utoronto.ca | LinkedIn: https://www.linkedin.com/in/bill-yuan-hong-sun/ | " +
            "GitHub: https://github.com/billyhsun\n" +
            "Mentorship: free 30-minute consulting calls — book at https://calendly.com/billyhsun/30min\n"
    );

    for (const page of pages) {
        if (!page.content || page.content.length < 20) continue;
        sections.push(
            "--- PAGE: " +
                page.title +
                " (" +
                page.path +
                ") ---\n" +
                (page.description ? page.description + "\n" : "") +
                page.content
        );
    }

    if (publications.length) {
        sections.push("--- PUBLICATIONS ---");
        for (const pub of publications) {
            sections.push(
                [
                    pub.title,
                    (pub.badges || []).join(", "),
                    pub.desc,
                    pub.citation ? pub.citation.replace(/\n+/g, " ") : "",
                    pub.doi ? "DOI: " + pub.doi : "",
                ]
                    .filter(Boolean)
                    .join("\n")
            );
        }
    }

    if (skills.length) {
        sections.push("--- SKILLS ---");
        for (const col of skills) {
            const items = (col.skills || [])
                .map(function (s) {
                    return s.name + (s.level ? " (" + s.level + ")" : "");
                })
                .join(", ");
            sections.push((col.title || "Skills") + ": " + items);
        }
    }

    return sections.join("\n\n");
}

function main() {
    const stylesContent = fs.readFileSync(STYLES_JS, "utf8");
    const pages = collectHtmlPages();
    const publications = extractPublications(stylesContent);
    const skills = extractSkills(stylesContent);
    const knowledgeText = buildKnowledgeText(pages, publications, skills);

    const output = {
        generatedAt: new Date().toISOString(),
        pageCount: pages.length,
        publicationCount: publications.length,
        knowledgeText,
        pages: pages.map(function (p) {
            return { path: p.path, title: p.title, description: p.description };
        }),
        publications: publications.map(function (p) {
            return {
                title: p.title,
                year: p.year,
                badges: p.badges,
                desc: p.desc,
                doi: p.doi,
            };
        }),
    };

    fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
    fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2), "utf8");
    console.log("Wrote " + OUTPUT);
    console.log("Pages: " + pages.length + ", Publications: " + publications.length);
    console.log("Knowledge text length: " + knowledgeText.length + " chars");
}

main();
