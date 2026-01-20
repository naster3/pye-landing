import type { EventEntry, EventLink } from "./events-types";

type EventModule = {
    frontmatter?: Record<string, unknown>;
};

const eventModules = import.meta.glob("../pages/events/*.mdx", {
    eager: true,
});

const parseLinks = (value: unknown): EventLink[] => {
    if (!Array.isArray(value)) return [];

    return value
        .map((link) => {
            if (!link || typeof link !== "object") return null;
            const label = "label" in link ? String(link.label ?? "") : "";
            const url = "url" in link ? String(link.url ?? "") : "";

            if (!label.trim() || !url.trim()) return null;

            return {
                label: label.trim(),
                url: url.trim(),
            };
        })
        .filter((link): link is EventLink => Boolean(link));
};

const parsePriority = (value: unknown): number => {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    const parsed = Number.parseInt(String(value ?? ""), 10);
    return Number.isFinite(parsed) ? parsed : 99;
};

export const getEventEntries = (): EventEntry[] => {
    return Object.entries(eventModules)
        .map(([path, module]) => {
            const data = (module as EventModule).frontmatter ?? {};
            const fallbackSlug =
                path.split("/").pop()?.replace(/\.mdx?$/, "") ?? "";
            const slug =
                typeof data.slug === "string" && data.slug.trim()
                    ? data.slug.trim()
                    : fallbackSlug;

            const title =
                typeof data.title === "string" && data.title.trim()
                    ? data.title.trim()
                    : slug;

            const date =
                typeof data.date === "string" && data.date.trim()
                    ? data.date.trim()
                    : "";

            const time =
                typeof data.time === "string" && data.time.trim()
                    ? data.time.trim()
                    : undefined;

            const description =
                typeof data.description === "string" && data.description.trim()
                    ? data.description.trim()
                    : "";

            const priority = parsePriority(data.priority);
            const links = parseLinks(data.links);

            return {
                slug,
                title,
                date,
                time,
                description,
                priority,
                links,
            };
        })
        .filter((event) => event.slug && event.title && event.date);
};
