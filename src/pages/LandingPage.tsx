import Hero from '../components/Hero';
import DemoChat from '../components/DemoChat';
import TrustSection from '../components/TrustSection';
import FeeSection from '../components/FeeSection';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="py-4 border-b border-slate-200/60 bg-white/70 backdrop-blur-md fixed w-full z-50 top-0">
                <div className="container flex justify-between items-center h-10">
                    <div className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
                        <span className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-serif italic">B</span>
                        Breathe AI
                    </div>
                    <button
                        onClick={() => navigate('/demo')}
                        className="btn btn-primary text-sm px-4 py-2"
                    >
                        Get Started
                    </button>
                </div>
            </header>

            <main className="pt-20">
                <Hero />

                {/* Demo Section */}
                <section className="py-12 bg-slate-50 overflow-hidden">
                    <div className="container">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            <div className="lg:w-1/2">
                                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                    Watch it work in <span className="text-sky-500">real-time</span>.
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Secure Integration', desc: 'Securely connect your credit card accounts. We use bank-level 256-bit encryption.' },
                                        { title: 'Smart Analysis', desc: 'Our AI scans for high APRs and unnecessary fees in your statement history.' },
                                        { title: 'Automated Negotiation', desc: 'The AI contacts customer support via chat or email to request better terms using proven scripts.' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-sky-200 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm shrink-0">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-900">{item.title}</h4>
                                                <p className="text-sm text-slate-500 leading-relaxed mt-1">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full perspective-1000">
                                <DemoChat />
                            </div>
                        </div>
                    </div>
                </section>

                <TrustSection />
                <FeeSection />
            </main>

            <footer className="py-12 bg-slate-900 text-slate-400 text-center text-sm border-t border-slate-800">
                <div className="container">
                    <p>© 2024 Breathe AI. Helping you breathe easier.</p>
                </div>
            </footer>
        </div>
    );
}
