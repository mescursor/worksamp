import { Check } from 'lucide-react';

export default function FeeSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-xl text-slate-600">
                        It costs $0 to start. We share in the success.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Self-Negotiation</h3>
                        <p className="text-slate-500 mb-6">If you do it yourself</p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex gap-3 text-slate-700">
                                <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">✕</span>
                                Hours on hold with banks
                            </li>
                            <li className="flex gap-3 text-slate-700">
                                <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">✕</span>
                                Uncertain outcomes
                            </li>
                            <li className="flex gap-3 text-slate-700">
                                <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">✕</span>
                                Stressful conversations
                            </li>
                        </ul>
                        <div className="text-center">
                            <span className="text-3xl font-bold text-slate-400">Hours Lost</span>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl transform md:scale-105 relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                            Recommended
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Breathe AI</h3>
                        <p className="text-slate-400 mb-6">Let us handle the stress</p>
                        <div className="mb-8">
                            <span className="text-5xl font-bold text-white">0%</span>
                            <span className="text-slate-400 ml-2">Monthly Fees</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Free Audit & Analysis",
                                "No Upfront Costs",
                                "25% of Savings Generated",
                                "Cancel Anytime"
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-slate-200">
                                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0"><Check size={14} /></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full btn btn-primary py-4 text-lg">Start Saving Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
