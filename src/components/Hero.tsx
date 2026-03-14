import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/20">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">
                        The Wisdom of Odù Ifá
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight max-w-4xl">
                    The Roots of Aṣẹ: <br />
                    <span className="text-accent italic">Reclaiming Yorùbá Philosophy.</span>
                </h1>

                <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10 leading-relaxed">
                    We are clearing the path to the crossroads, meeting the Òrìṣà not as folklore, but as the living, mathematical laws of the universe.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/blog"
                        className="px-8 py-4 bg-accent text-background font-bold rounded-full flex items-center justify-center gap-2 transition-all hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
                        aria-label="Explore The Oracle" // Added aria-label
                    >
                        Explore The Oracle <ArrowRight size={20} />
                    </Link>
                    <Link
                        href="/about"
                        className="px-8 py-4 bg-background border border-foreground/10 text-foreground font-bold rounded-full flex items-center justify-center gap-2 transition-all hover:bg-foreground/5 hover:border-foreground/20"
                        aria-label="Learn about The Lineage" // Added aria-label
                    >
                        The Lineage
                    </Link>
                </div>
            </div>

            {/* Background Accent Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>
    );
}
