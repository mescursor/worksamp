import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className="pt-32 pb-16 px-6">
            <div className="container text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-700 text-sm font-medium mb-8 border border-sky-100">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    AI Negotiation Agent Live
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                    Stop Overpaying. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">
                        Let AI Negotiate For You.
                    </span>
                </h1>

                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Breathe AI talks directly to your creditors to lower your APR and reduce your debt balance.
                    Zero risk—you only pay if we save you money.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => navigate('/demo')}
                        className="btn btn-primary text-lg px-8 py-4 shadow-lg shadow-sky-500/25"
                    >
                        Start Free Negotiation
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button className="btn bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 text-lg px-8 py-4">
                        See How It Works
                    </button>
                </div>
            </div>
        </section>
    );
}
