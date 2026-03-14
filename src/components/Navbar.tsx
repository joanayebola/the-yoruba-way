"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Ghost } from "lucide-react";

const NAV_LINKS = [
    { label: "The Gourd", href: "/", description: "Home" },
    { label: "The Lineage", href: "/about", description: "About" },
    { label: "The Oracle", href: "/blog", description: "Blog" },
    { label: "Connect", href: "/connect", description: "Contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-accent/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-background transition-transform group-hover:scale-110">
                        <Ghost size={24} />
                    </div>
                    <span className="font-serif text-xl font-bold tracking-tight">The Yorùbá Way</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group flex flex-col items-start"
                            aria-label={`Go to ${link.label} (${link.description})`}
                        >
                            <span className="text-sm font-medium hover:text-accent transition-colors">
                                {link.label}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold group-hover:text-accent/60 transition-colors">
                                {link.description}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-accent/10 p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex flex-col"
                        >
                            <span className="text-lg font-serif font-bold text-accent">
                                {link.label}
                            </span>
                            <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">
                                {link.description}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
