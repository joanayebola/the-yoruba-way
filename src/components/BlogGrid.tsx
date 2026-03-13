import { MOCK_POSTS } from "@/data/mock-data";
import PostCard from "./PostCard";

export default function BlogGrid() {
    return (
        <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 italic">
                        Latest from The Oracle
                    </h2>
                    <p className="text-foreground/60 max-w-lg">
                        Ancient wisdom meeting the modern lens. Explore the depth of Yorùbá philosophy through our latest writings.
                    </p>
                </div>
                <div className="h-[2px] flex-grow bg-accent/10 mx-8 hidden md:block mb-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...MOCK_POSTS]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 3)
                    .map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
            </div>
        </section>
    );
}
