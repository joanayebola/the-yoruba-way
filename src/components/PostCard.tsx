import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/blog";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="glass-card rounded-3xl overflow-hidden flex flex-col h-full group transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5">
            <Link href={`/blog/${post.slug}`} className="relative h-64 w-full overflow-hidden block" aria-label={`Read more about ${post.title}`}>
                {post.image ? (
                    <Image
                        src={post.image}
                        alt={`Featured image for ${post.title}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                        <span className="text-accent font-serif text-2xl font-bold italic">The Yorùbá Way</span>
                    </div>
                )}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-3 py-1 rounded-full bg-accent text-background text-[10px] font-bold uppercase tracking-widest self-start">
                        {post.category}
                    </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5">
                        <Calendar size={12} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock size={12} /> {post.readingTime}
                    </span>
                </div>

                <h3 className="text-2xl font-serif font-bold mb-4 line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                    <Link href={`/blog/${post.slug}`} aria-label={post.title}>
                        {post.title}
                    </Link>
                </h3>

                <p className="text-foreground/60 leading-relaxed mb-6 line-clamp-2 text-sm italic">
                    {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <Link
                        href={`/blog/${post.slug}`}
                        className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] flex items-center gap-2 group/link"
                        aria-label={`Read transmission: ${post.title}`}
                    >
                        Seek Further
                        <div className="w-6 h-[1px] bg-accent transition-all group-hover/link:w-10" />
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/20">
                        Odù-Grounded
                    </span>
                </div>
            </div>
        </article>
    );
}
