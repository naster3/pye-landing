// Endpoint SSR para exponer eventos en JSON.
import type { APIRoute } from "astro";
import { getEventEntries } from "../../lib/events-data";

export const GET: APIRoute = async () => {
    const events = getEventEntries();

    return new Response(JSON.stringify(events), {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=0, s-maxage=300",
        },
    });
};
