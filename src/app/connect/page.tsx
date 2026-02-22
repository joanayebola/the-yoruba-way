"use client";

import { useState, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Navbar from "@/components/Navbar";
import { Mail, MessageSquare, Send, Globe, Star, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { sendContactMessage, ContactFormState } from "./actions";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-accent text-background font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl shadow-accent/20 disabled:opacity-70 disabled:hover:scale-100"
        >
            {pending ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    <span className="uppercase tracking-widest text-sm text-background">Sending Message...</span>
                </>
            ) : (
                <>
                    <Send size={18} />
                    <span className="uppercase tracking-widest text-sm text-background">Send Message</span>
                </>
            )}
        </button>
    );
}

export default function ConnectPage() {
    const [state, setState] = useState<ContactFormState | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    async function handleAction(formData: FormData) {
        // Reset state
        setState(null);

        const result = await sendContactMessage(null, formData);
        setState(result);

        if (result.success) {
            setIsSuccess(true);
            formRef.current?.reset();
            // Optional: hide success message after some time
            // setTimeout(() => setIsSuccess(false), 8000);
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto text-center">
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent/10 border border-accent/20">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent">
                        At the Oríta
                    </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 italic">
                    Connect with the Lineage
                </h1>
                <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                    Connection in Yorùbá philosophy is not a transaction; it is a sacred alignment.
                    Whether you seek clarity, collaboration, or simply wish to honor the ancestors,
                    the path is open.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left Side: Philosophy */}
                <div className="space-y-12">
                    <div className="glass-card p-10 rounded-[2.5rem] bg-accent/5 border-accent/10 relative overflow-hidden">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl opacity-50" />
                        <h2 className="text-3xl font-serif font-bold mb-6 italic">The Protocol of Engagement</h2>
                        <div className="space-y-6 text-foreground/70">
                            <p>
                                In the sacred archives of the <strong>Odù Ifá</strong>, every encounter is governed by <strong>Ìwà</strong> (character).
                                We do not communicate into a void; we communicate to manifest.
                            </p>
                            <p>
                                When you reach out, remember that your <strong>Orí</strong> (personal divinity) precedes you.
                                We prioritize inquiries that are grounded in respect for the lineage and a genuine
                                desire to unlearn the colonial shorthand.
                            </p>
                            <div className="pt-6 flex flex-wrap gap-4">
                                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent/60">
                                    <Star size={14} /> Ancient Wisdom
                                </span>
                                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent/60">
                                    <Globe size={14} /> Global Lineage
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Side: Form */}
                <div className="glass-card p-10 rounded-[2.5rem] bg-foreground/[0.01] border-accent/10 relative">
                    {isSuccess ? (
                        <div className="py-20 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                <CheckCircle2 size={40} />
                            </div>
                            <h2 className="text-3xl font-serif font-bold italic">Message Received</h2>
                            <p className="text-foreground/60 max-w-sm">
                                Your message has been received. We will respond as soon as possible.
                            </p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="text-accent text-sm font-bold uppercase tracking-widest hover:underline"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form ref={formRef} action={handleAction} className="space-y-8">
                            {/* Honeypot Field */}
                            <input type="text" name="honeypot" className="hidden" aria-hidden="true" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 pl-4">Your Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Enter name..."
                                        defaultValue={state?.data?.name}
                                        className={`w-full bg-background/50 border ${state?.fieldErrors?.name ? 'border-red-400/50' : 'border-accent/10'} rounded-2xl py-4 px-6 focus:outline-none focus:border-accent/30 transition-colors`}
                                        required
                                    />
                                    {state?.fieldErrors?.name && (
                                        <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest pl-4">{state.fieldErrors.name[0]}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 pl-4">Return Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        defaultValue={state?.data?.email}
                                        className={`w-full bg-background/50 border ${state?.fieldErrors?.email ? 'border-red-400/50' : 'border-accent/10'} rounded-2xl py-4 px-6 focus:outline-none focus:border-accent/30 transition-colors`}
                                        required
                                    />
                                    {state?.fieldErrors?.email && (
                                        <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest pl-4">{state.fieldErrors.email[0]}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 pl-4">The Inquiry</label>
                                <select
                                    name="inquiry"
                                    defaultValue={state?.data?.inquiry || "General Guidance"}
                                    className="w-full bg-background/50 border border-accent/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent/30 transition-colors appearance-none"
                                >
                                    <option value="General Guidance">General Guidance</option>
                                    <option value="Academic Collaboration">Academic Collaboration</option>
                                    <option value="Spiritual Consultation">Spiritual Consultation</option>
                                    <option value="Correction of Metadata">Correction of Metadata</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 pl-4">The Message</label>
                                <textarea
                                    name="message"
                                    rows={6}
                                    placeholder="State your intent with clarity..."
                                    defaultValue={state?.data?.message}
                                    className={`w-full bg-background/50 border ${state?.fieldErrors?.message ? 'border-red-400/50' : 'border-accent/10'} rounded-2xl py-4 px-6 focus:outline-none focus:border-accent/30 transition-colors resize-none`}
                                    required
                                ></textarea>
                                {state?.fieldErrors?.message && (
                                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest pl-4">{state.fieldErrors.message[0]}</p>
                                )}
                            </div>


                            <SubmitButton />
                        </form>
                    )}
                </div>
            </div>

            <footer className="py-12 border-t border-accent/10 text-center">
                <p className="text-sm text-foreground/40 font-bold uppercase tracking-widest">
                    © 2026 The Yorùbá Way | Reclaiming the Lineage
                </p>
            </footer>
        </main>
    );
}
