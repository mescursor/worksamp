import { Shield, Lock, FileText, CheckCircle } from 'lucide-react';

export default function TrustSection() {
    return (
        <section className="py-20 bg-slate-900 text-white">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Financial Security is Our Priority</h2>
                    <p className="text-slate-400 text-lg">
                        We use the same encryption standards as major banks to ensure your data is always protected.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Lock className="w-8 h-8 text-emerald-400" />,
                            title: "Bank-Level Security",
                            desc: "256-bit AES encryption keeps your personal and financial information secure at rest and in transit."
                        },
                        {
                            icon: <Shield className="w-8 h-8 text-emerald-400" />,
                            title: "Risk-Free Guarantee",
                            desc: "We only get paid when we successfully save you money. No hidden fees, ever."
                        },
                        {
                            icon: <FileText className="w-8 h-8 text-emerald-400" />,
                            title: "Legal Defense Support",
                            desc: "If creditors take legal action, our partner network provides legal support options."
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-colors">
                            <div className="bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Security badges placeholder - simulated with text/icons for now */}
                    <div className="flex items-center gap-2"><CheckCircle size={20} /> SOC2 Compliant</div>
                    <div className="flex items-center gap-2"><Lock size={20} /> SSL Secure</div>
                    <div className="flex items-center gap-2"><Shield size={20} /> GDPR Ready</div>
                </div>
            </div>
        </section>
    );
}
