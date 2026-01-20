import type { EventEntry } from "./events-types";

const CACHE_TTL_MS = 1000 * 60 * 5;

let cachedEvents: {
    data: EventEntry[];
    expiresAt: number;
} | null = null;

export const fetchEvents = async (
    backendUrl: string,
): Promise<EventEntry[]> => {
    const now = Date.now();
    if (cachedEvents && now < cachedEvents.expiresAt) {
        return cachedEvents.data;
    }

    try {
        const response = await fetch(backendUrl, {
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            if (cachedEvents) return cachedEvents.data;
            return [];
        }

        const data = (await response.json()) as EventEntry[];
        cachedEvents = {
            data,
            expiresAt: now + CACHE_TTL_MS,
        };

        return data;
    } catch (error) {
        if (cachedEvents) return cachedEvents.data;
        return [];
    }
};
