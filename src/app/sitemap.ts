import { MOCK_POSTS } from "@/data/mock-data";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = MOCK_POSTS.map((post) => ({
        url: `https://theyorubaway.com/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [
        {
            url: "https://theyorubaway.com",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: "https://theyorubaway.com/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: "https://theyorubaway.com/connect",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        ...posts,
    ];
}
