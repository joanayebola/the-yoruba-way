"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import PostCard from "@/components/PostCard";
import Newsletter from "@/components/Newsletter";
import { MOCK_POSTS } from "@/data/mock-data";
import { Search } from "lucide-react";

export default function OraclePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const normalizeString = (str: string) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const filteredPosts = useMemo(() => {
        const query = normalizeString(searchQuery);

        return MOCK_POSTS.filter((post) => {
            const matchesSearch =
                normalizeString(post.title).includes(query) ||
                normalizeString(post.excerpt).includes(query);

            const matchesCategory =
                selectedCategory === "All" || post.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/20">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent">
                            The Archives of the Odù
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 italic">
                        The Oracle
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                        The 256 Odù are more than a library; they are the living DNA of our existence. We are stripping away the colonial shorthand to reveal the sophisticated logic our ancestors left for us. This isn't folklore, it is the original blueprint for a life of character and power.
                    </p>
                </header>

                {/* Search & Filter Section */}
                <div className="mb-16">
                    <div className="max-w-xl mx-auto mb-10 relative">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-foreground/20">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search the archives..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-background/50 backdrop-blur-sm border border-accent/10 rounded-full py-4 pl-14 pr-8 focus:outline-none focus:border-accent/30 transition-colors text-sm"
                        />
                    </div>
                    <FilterBar
                        activeCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                </div>

                {/* Blog Post Staggered Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                        {filteredPosts.map((post, index) => (
                            <div
                                key={post.id}
                                className={`${index % 2 === 1 ? "md:translate-y-12" : ""} transition-transform duration-700`}
                            >
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40">
                        <p className="text-xl font-serif italic text-foreground/40">
                            The Oracle is silent for now. Try another path.
                        </p>
                    </div>
                )}
            </div>

            <Newsletter />

            <footer className="py-12 border-t border-accent/10 text-center">
                <p className="text-sm text-foreground/40 font-bold uppercase tracking-widest">
                    © 2026 The Yorùbá Way | Reclaiming the Lineage
                </p>
            </footer>
        </main>
    );
}
