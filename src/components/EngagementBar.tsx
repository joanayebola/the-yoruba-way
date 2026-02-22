"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Link2, Check } from "lucide-react";
import { XIcon } from "./icons/XIcon";
import { cn } from "@/lib/utils";

interface EngagementBarProps {
    slug: string;
}

export default function EngagementBar({ slug }: EngagementBarProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [copied, setCopied] = useState(false);

    // Persistence logic
    useEffect(() => {
        const storedLiked = localStorage.getItem(`liked_${slug}`);
        const storedLikesCount = localStorage.getItem(`likes_count_${slug}`);

        if (storedLiked === "true") {
            setIsLiked(true);
        }
        if (storedLikesCount) {
            setLikes(parseInt(storedLikesCount, 10));
        } else {
            // Initial state if never liked/interacted
            setLikes(0);
        }
    }, [slug]);

    const toggleLike = () => {
        const newLikedState = !isLiked;
        const newLikesCount = newLikedState ? likes + 1 : Math.max(0, likes - 1);

        setIsLiked(newLikedState);
        setLikes(newLikesCount);

        localStorage.setItem(`liked_${slug}`, String(newLikedState));
        localStorage.setItem(`likes_count_${slug}`, String(newLikesCount));
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareX = () => {
        const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto px-4">
            <div className="glass-card bg-background/90 border border-accent/20 rounded-full p-1.5 flex items-center justify-center gap-2 shadow-2xl backdrop-blur-md">
                {/* Like Button */}
                <button
                    onClick={toggleLike}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 relative overflow-hidden group"
                >
                    <motion.div
                        animate={{
                            scale: isLiked ? [1, 1.4, 1] : 1,
                            rotate: isLiked ? [0, 15, -15, 0] : 0,
                        }}
                        transition={{ duration: 0.4 }}
                        className={cn(
                            "p-1 rounded-full transition-colors duration-300",
                            isLiked ? "text-accent bg-accent/10 shadow-[0_0_15px_rgba(210,105,30,0.4)]" : "text-foreground/40"
                        )}
                    >
                        <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                    </motion.div>
                    <span className={cn(
                        "text-xs font-serif font-bold italic transition-colors",
                        isLiked ? "text-accent" : "text-foreground/60"
                    )}>
                        {likes}
                    </span>
                </button>

                <div className="h-8 w-px bg-accent/10 mx-2" />

                {/* Share Utility */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={copyLink}
                        className="p-2.5 rounded-full hover:bg-accent/5 transition-colors text-foreground/60 hover:text-accent group relative"
                        title="Copy Link"
                    >
                        {copied ? <Check size={18} className="text-green-600" /> : <Link2 size={18} />}
                        <AnimatePresence>
                            {copied && (
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] py-1 px-2 rounded font-bold uppercase tracking-widest"
                                >
                                    Copied!
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    <button
                        onClick={shareX}
                        className="p-2.5 rounded-full hover:bg-accent/5 transition-colors text-foreground/60 hover:text-accent"
                        title="Share on X"
                    >
                        <XIcon size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
