export const parseEventDateTime = (date: string, time?: string): Date => {
    const safeTime = time && time.trim() ? time.trim() : "23:59";
    const dateTime = `${date}T${safeTime}`;
    const parsed = new Date(dateTime);

    if (Number.isNaN(parsed.getTime())) {
        return new Date(date);
    }

    return parsed;
};

export const formatEventDate = (date: string, time?: string): string => {
    const parsed = parseEventDateTime(date, time);
    const dateLabel = new Intl.DateTimeFormat("es-AR", {
        dateStyle: "long",
    }).format(parsed);

    if (time && time.trim()) {
        return `${dateLabel} · ${time.trim()}`;
    }

    return dateLabel;
};
