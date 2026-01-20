export type EventLink = {
    label: string;
    url: string;
};

export type EventEntry = {
    slug: string;
    title: string;
    date: string;
    time?: string;
    description: string;
    priority: number;
    links: EventLink[];
};
