import { Metadata } from "next";
import { MOCK_POSTS } from "@/data/mock-data";
import { POST_CONTENT } from "@/data/post-content";
import Navbar from "@/components/Navbar";
import TruthCheck from "@/components/TruthCheck";
import Tooltip from "@/components/Tooltip";
import ScrollProgress from "@/components/ScrollProgress";
import EngagementBar from "@/components/EngagementBar";
// import AudioSnippet from "@/components/AudioSnippet";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = MOCK_POSTS.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: "Post Not Found | The Yorùbá Way",
        };
    }

    return {
        title: `${post.title} | The Yorùbá Way`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            siteName: "The Yorùbá Way",
            images: post.image ? [{ url: post.image }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.image ? [post.image] : [],
        },
    };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = MOCK_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const content = POST_CONTENT[slug];

    return (
        <main>
            <ScrollProgress />
            <Navbar />

            <article className="pt-32 pb-20 px-6 lg:px-12 max-w-4xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-widest mb-12 hover:translate-x-[-4px] transition-transform"
                >
                    <ArrowLeft size={16} /> Back to The Oracle
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-6 text-[10px] text-foreground/40 font-bold uppercase tracking-[0.2em] mb-8">
                        <span className="px-3 py-1 rounded-full bg-accent text-background">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={12} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={12} /> {post.readingTime}
                        </span>
                        {post.verified && (
                            <span className="flex items-center gap-1.5 text-accent border border-accent/20 px-2 py-0.5 rounded capitalize">
                                <ShieldCheck size={10} /> Parrot-Free
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-7xl font-serif font-bold mb-10 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-4 py-8 border-y border-accent/10">
                        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center font-serif text-accent font-bold text-xl border border-accent/20">
                            {post.author[0]}
                        </div>
                        <div>
                            <p className="text-sm font-bold tracking-widest uppercase mb-1">{post.author}</p>
                            <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">Guardian of the Lineage</p>
                        </div>
                    </div>
                </header>

                {post.image && (
                    <div className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="prose prose-lg max-w-none prose-serif text-foreground/80 leading-relaxed">
                    {content ? (
                        content
                    ) : (
                        <>
                            <p className="text-xl font-serif italic mb-8 text-foreground">
                                {post.excerpt}
                            </p>
                            <p>
                                The wisdom of <Tooltip term="Odù Ifá" /> is an infinite library of human experience.
                                While the specific content for this transmission is being prepared, alignment with your
                                <Tooltip term="Orí" /> remains the priority.
                            </p>
                            {/* <div className="my-12 p-8 glass-card rounded-3xl bg-accent/5">
                                <h4 className="text-lg font-serif font-bold mb-4">Listen to the Tone</h4>
                                <div className="flex flex-wrap gap-4">
                                    <AudioSnippet word="Aṣẹ" />
                                    <AudioSnippet word="Òrìṣà" />
                                    <AudioSnippet word="Orí" />
                                </div>
                            </div> */}
                        </>
                    )}
                </div>
            </article>

            <EngagementBar slug={post.slug} />
        </main>
    );
}
