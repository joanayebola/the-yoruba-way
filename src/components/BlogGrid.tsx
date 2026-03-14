import { MOCK_POSTS } from "@/data/mock-data";
import PostCard from "./PostCard";

export default function BlogGrid() {
    return (
        <section className="py-24 px-8 lg:px-16 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 italic">
                        Latest from The Oracle
                    </h2>
                    <p className="text-foreground/70 max-w-xl text-lg">
                        Ancient wisdom meeting the modern lens. Explore the depth of Yorùbá philosophy through our latest writings.
                    </p>
                </div>
                <div className="h-[1px] flex-grow bg-accent/20 mx-12 hidden md:block mb-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
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
