import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2, Building2, ChevronRight, CheckCircle2, Lock, Star, Play, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Step = 'connect' | 'details' | 'simulating' | 'success' | 'payment';

export default function DemoPage() {
    const [step, setStep] = useState<Step>('connect');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const navigate = useNavigate();

    // Social Proof Toasts
    const [toast, setToast] = useState<{ name: string, location: string, saved: string } | null>(null);
    useEffect(() => {
        const examples = [
            { name: "Sarah M.", location: "Los Angeles, CA", saved: "$1,200" },
            { name: "James R.", location: "Austin, TX", saved: "$850" },
            { name: "Emily K.", location: "New York, NY", saved: "$2,400" },
            { name: "Michael B.", location: "Chicago, IL", saved: "$540" },
            { name: "David L.", location: "Miami, FL", saved: "$1,100" }
        ];

        const showToast = () => {
            const random = examples[Math.floor(Math.random() * examples.length)];
            setToast(random);
            setTimeout(() => setToast(null), 5000); // Hide after 5s
        };

        const interval = setInterval(showToast, 8000); // Show every 8s
        setTimeout(showToast, 2000); // First one after 2s

        return () => clearInterval(interval);
    }, []);

    // Simulation Logic
    useEffect(() => {
        if (step === 'simulating') {
            const negotiationSteps = [
                "Connecting to secure banking API...",
                "Analyzing Chase Sapphire Reserve statement...",
                "Detected APR: 24.99% (High Variance)",
                "Initiating contact with Chase negotiation department...",
                "Agent: Requesting APR reduction based on payment history.",
                "Bank: Reviewing account standing...",
                "Bank: Counter-offer received: 15.24%.",
                "Agent: Accepting offer. Confirming details.",
                "Finalizing terms...",
                "Success! Reduction applied."
            ];

            let currentLog = 0;
            const interval = setInterval(() => {
                if (currentLog < negotiationSteps.length) {
                    setLogs(prev => [...prev, negotiationSteps[currentLog]]);
                    setProgress(prev => Math.min(prev + 10, 100));
                    currentLog++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => setStep('success'), 1000);
                }
            }, 1500);

            return () => clearInterval(interval);
        }
    }, [step]);

    const handleConnect = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep('details');
        }, 2000);
    };

    const handleStartSimulation = () => {
        setStep('simulating');
    };

    // Exit Intent Logic
    const [showExitPopup, setShowExitPopup] = useState(false);
    const [hasShownExitPopup, setHasShownExitPopup] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShownExitPopup) {
                setShowExitPopup(true);
                setHasShownExitPopup(true);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasShownExitPopup]);

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 relative">
            {/* Exit Intent Popup */}
            <AnimatePresence>
                {showExitPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden text-center"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 to-indigo-500"></div>
                            <button
                                onClick={() => setShowExitPopup(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                                <AlertCircle size={32} />
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Wait! Don't Leave Yet.</h2>
                            <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                                You are leaving <span className="font-bold text-emerald-600">$500+</span> in potential savings on the table.
                            </p>

                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-8">
                                <p className="text-sm font-bold text-slate-900 mb-1">🎁 EXCLUSIVE OFFER</p>
                                <p className="text-slate-600 text-sm">Get <span className="font-bold text-sky-600">0% Service Fee</span> on your first negotiation if you start now.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        setShowExitPopup(false);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="btn btn-primary w-full py-4 text-lg shadow-xl shadow-sky-500/20"
                                >
                                    Claim 0% Fee Offer
                                </button>
                                <button
                                    onClick={() => setShowExitPopup(false)}
                                    className="text-slate-400 text-sm hover:text-slate-600 font-medium py-2"
                                >
                                    No thanks, I like overpaying interest
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div onClick={() => navigate('/')} className="inline-flex items-center gap-2 cursor-pointer mb-6">
                        <span className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-serif italic font-bold">B</span>
                        <span className="font-bold text-xl tracking-tight text-slate-900">Breathe AI</span>
                    </div>

                    <div className="mb-6">
                        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">TRUSTED BY USERS FEATURED IN</p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 opacity-60 grayscale hover:grayscale-0 transition-opacity duration-300">
                            <span className="text-base font-serif font-bold text-slate-600">The Wall Street Journal</span>
                            <span className="text-base font-bold tracking-tighter text-slate-700">TechCrunch</span>
                            <span className="text-base font-serif font-bold text-slate-700">Forbes</span>
                            <span className="text-base font-bold text-slate-600">CNBC</span>
                        </div>
                    </div>
                </div>

                {/* Urgency Banner */}
                {step === 'connect' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-center gap-3 text-sm text-amber-800"
                    >
                        <Clock size={16} className="text-amber-600" />
                        <span><strong>High Demand:</strong> Due to heavy volume, average wait times are increasing. Secure your negotiation slot now.</span>
                    </motion.div>
                )}

                {/* Main Card */}
                <motion.div
                    layout
                    className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative min-h-[500px] mb-12"
                >
                    {/* Progress Bar */}
                    {step !== 'success' && (
                        <div className="h-1.5 bg-slate-100 w-full">
                            <motion.div
                                className="h-full bg-sky-500"
                                initial={{ width: 0 }}
                                animate={{
                                    width: step === 'connect' ? '25%' : step === 'details' ? '50%' : step === 'simulating' ? `${50 + (progress / 2)}%` : step === 'success' ? '90%' : '100%'
                                }}
                            />
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {step === 'connect' && (
                                <motion.div
                                    key="connect"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="text-center mb-8">
                                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Connect Your Accounts</h1>
                                        <p className="text-slate-500">Securely link your credit cards to identify negotiation opportunities.</p>
                                    </div>

                                    <button
                                        onClick={handleConnect}
                                        disabled={loading}
                                        className="w-full p-4 border-2 border-slate-200 rounded-xl flex items-center gap-4 hover:border-sky-500 hover:bg-sky-50 transition-all group mb-4"
                                    >
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-sky-200 group-hover:text-sky-700 transition-colors">
                                            {loading ? <Loader2 className="animate-spin" /> : <Building2 />}
                                        </div>
                                        <div className="text-left flex-1">
                                            <h3 className="font-semibold text-slate-900">Chase Sapphire Reserve</h3>
                                            <p className="text-sm text-slate-500">Ending in •••• 4492</p>
                                        </div>
                                        <ChevronRight className="text-slate-300 group-hover:text-sky-500" />
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-6 bg-slate-50 py-2 rounded-full">
                                        <ShieldCheck size={14} className="text-emerald-500" />
                                        <span>Bank-level 256-bit encryption. Your credentials are never stored.</span>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'details' && (
                                <motion.div
                                    key="details"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="text-center mb-8">
                                        <h1 className="text-2xl font-bold text-slate-900 mb-2">A Few Details</h1>
                                        <p className="text-slate-500">Help the AI understand your financial profile better.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Occupation</label>
                                            <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500">
                                                <option>Select Occupation</option>
                                                <option>Software Engineer</option>
                                                <option>Teacher</option>
                                                <option>Healthcare Professional</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Income (Gross)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-slate-400">$</span>
                                                <input type="number" className="w-full p-3 pl-8 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500" placeholder="5,000" />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleStartSimulation}
                                        className="w-full btn btn-primary mt-8 py-3 text-lg"
                                    >
                                        Start Negotiation
                                    </button>
                                    <p className="text-center text-xs text-slate-400 mt-4">
                                        <AlertCircle size={12} className="inline mr-1" />
                                        This action will not impact your credit score.
                                    </p>
                                </motion.div>
                            )}

                            {step === 'simulating' && (
                                <motion.div
                                    key="simulating"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center"
                                >
                                    <div className="mb-8">
                                        <div className="relative w-24 h-24 mx-auto mb-6">
                                            <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
                                            <motion.div
                                                className="absolute inset-0 rounded-full border-4 border-sky-500 border-t-transparent"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-700">
                                                {progress}%
                                            </div>
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900">AI Negotiation in Progress</h2>
                                        <p className="text-slate-500">Please do not close this window.</p>
                                    </div>

                                    <div className="bg-slate-900 rounded-xl p-4 text-left font-mono text-sm h-48 overflow-hidden relative">
                                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                                        <div className="space-y-2">
                                            {logs.map((log, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="text-emerald-400"
                                                >
                                                    <span className="text-slate-500 mr-2">{'>'}</span>
                                                    {log}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 12 }}
                                        className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <CheckCircle2 size={40} />
                                    </motion.div>

                                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                                        Take a full breath. <br />
                                        We have reduced it.
                                    </h1>

                                    <div className="flex justify-center gap-8 my-8">
                                        <div className="text-center">
                                            <p className="text-sm text-slate-400 uppercase tracking-wide font-semibold mb-1">New APR</p>
                                            <p className="text-3xl font-bold text-slate-900">15.24%</p>
                                            <p className="text-xs text-red-400 line-through">was 24.99%</p>
                                        </div>
                                        <div className="w-px bg-slate-200"></div>
                                        <div className="text-center">
                                            <p className="text-sm text-slate-400 uppercase tracking-wide font-semibold mb-1">Yearly Savings</p>
                                            <p className="text-3xl font-bold text-emerald-500">$512</p>
                                            <p className="text-xs text-slate-400">Guaranteed</p>
                                        </div>
                                    </div>

                                    <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-8 text-sm text-sky-800">
                                        The new terms have been applied to your Chase Sapphire Reserve account ending in 4492. You will see the change on your next statement.
                                    </div>

                                    <button
                                        onClick={() => setStep('payment')}
                                        className="btn btn-primary w-full py-4 text-lg shadow-xl shadow-sky-500/20 animate-pulse hover:animate-none"
                                    >
                                        Secure This Reduction
                                    </button>
                                </motion.div>
                            )}

                            {step === 'payment' && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-left"
                                >
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <ShieldCheck size={32} />
                                        </div>
                                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Activate Continuous Monitoring</h1>
                                        <p className="text-slate-500">Secure your $512 savings and let AI monitor your accounts 24/7 for new reduction opportunities.</p>
                                    </div>

                                    <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-6 flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-sky-200 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Monthly Negotiation Pro</h4>
                                            <p className="text-xs text-slate-600 mt-1">We automatically negotiate interest rates, waiving late fees, and credit limit increases every month.</p>
                                            <p className="text-lg font-bold text-sky-600 mt-2">$29/mo <span className="text-xs text-slate-400 font-normal">cancel anytime</span></p>
                                        </div>
                                    </div>

                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Subscription Activated!'); }}>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Card Information</label>
                                            <div className="relative">
                                                <input type="text" className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:border-sky-500 pl-10" placeholder="0000 0000 0000 0000" />
                                                <Lock size={16} className="absolute left-3 top-3.5 text-slate-400" />
                                            </div>
                                            <div className="flex gap-4 mt-4">
                                                <input type="text" className="w-1/2 p-3 border border-slate-200 rounded-lg outline-none focus:border-sky-500" placeholder="MM / YY" />
                                                <input type="text" className="w-1/2 p-3 border border-slate-200 rounded-lg outline-none focus:border-sky-500" placeholder="CVC" />
                                            </div>
                                        </div>

                                        <button className="btn btn-primary w-full py-4 text-lg shadow-xl shadow-sky-500/20 mt-4">
                                            Start Saving Now
                                        </button>
                                        <div className="text-center">
                                            <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-4">
                                                <Lock size={12} /> Secure 256-bit SSL Encrypted Payment
                                            </p>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Reviews & Social Proof Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h3 className="font-bold text-slate-900 text-lg mb-2">Recent Success Stories</h3>
                        <div className="flex items-center justify-center gap-1 text-amber-400">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            <span className="text-slate-500 text-sm ml-2 font-medium">4.9/5 Average Rating</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            { name: "Sarah J.", role: "Teacher", saved: "$1,200", text: "I didn't believe it would work until I saw the email from Amex. Incredible." },
                            { name: "Michael R.", role: "Nurse", saved: "$850", text: "Saved me hours of phone calls. The AI just handled everything." },
                            { name: "David K.", role: "Designer", saved: "$2,100", text: "APR went from 22% to 14%. This app literally paid for itself instantly." }
                        ].map((review, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                                {/* Fake Video Thumbnail */}
                                <div className="relative aspect-video bg-slate-800 rounded-lg mb-4 overflow-hidden group cursor-pointer">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                            <Play size={16} className="text-white ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm italic mb-4 flex-1">"{review.text}"</p>
                                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                                        <p className="text-xs text-slate-400">{review.role}</p>
                                    </div>
                                    <div className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded">
                                        Saved {review.saved}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Privacy Footer */}
                    <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
                        <div className="flex gap-6">
                            <span className="flex items-center gap-2"><Lock size={16} /> AES-256 Encryption</span>
                            <span className="flex items-center gap-2"><ShieldCheck size={16} /> GDPR Compliant</span>
                            <span className="flex items-center gap-2"><AlertCircle size={16} /> SOC2 Type II</span>
                        </div>
                        <div>
                            © 2024 Breathe AI Safety First
                        </div>
                    </div>
                </div>

                {/* Social Proof Toast */}
                <AnimatePresence>
                    {toast && (
                        <motion.div
                            initial={{ opacity: 0, x: -50, y: 0 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: -50, scale: 0.9 }}
                            className="fixed bottom-6 left-6 z-50 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 flex items-center gap-4 max-w-sm"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                <Star size={18} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    {toast.name} from {toast.location}
                                </p>
                                <p className="text-xs text-slate-500">
                                    just reduced their debt by <span className="text-emerald-600 font-bold">{toast.saved}</span>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
