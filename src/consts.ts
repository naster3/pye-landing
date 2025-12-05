import type { SvgComponent } from "astro/types";
import XLogo from "./assets/icons/x.svg";
import YoutubeLogo from "./assets/icons/youtube.svg";
import DiscordLogo from "./assets/icons/discord.svg";
import InstagramLogo from "./assets/icons/instagram.svg";

export const PYETIMES_URL = "https://pyetimes.com";
export const GITHUB_URL = "https://github.com/somospye";
export const DISCORD_INVITE_URL = "https://discord.gg/programacion";
export const TWITTER_URL = "https://x.com/somospye";
export const INSTAGRAM_URL = "https://www.instagram.com/somospye";
export const YOUTUBE_URL = "https://www.youtube.com/@somospye";

interface Link {
    name: string;
    href: string;
}

export const NAVIGATION_LINKS: Link[] = [
    { name: "Unirme", href: DISCORD_INVITE_URL },
    { name: "Contactos", href: "#contact" },
    { name: "GitHub", href: GITHUB_URL },
    { name: "PyE Times", href: PYETIMES_URL },
];

interface SocialLink {
    name: string;
    href: string;
    icon: SvgComponent;
}

export const SOCIAL_LINKS: SocialLink[] = [
    {
        name: "Discord",
        href: DISCORD_INVITE_URL,
        icon: DiscordLogo,
    },
    {
        name: "X",
        href: TWITTER_URL,
        icon: XLogo,
    },
    {
        name: "YouTube",
        href: YOUTUBE_URL,
        icon: YoutubeLogo,
    },
    {
        name: "Instagram",
        href: INSTAGRAM_URL,
        icon: InstagramLogo,
    },
];