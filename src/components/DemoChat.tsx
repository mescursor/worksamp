import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Bot, Building2 } from 'lucide-react';

type Message = {
    id: string;
    sender: 'ai' | 'bank' | 'system';
    text: string;
    delay: number;
};

const INITIAL_MESSAGES: Message[] = [
    { id: '1', sender: 'system', text: 'Connecting to creditor API...', delay: 500 },
    { id: '2', sender: 'ai', text: 'Analyzing account #4492. Found high APR of 24.99%. Initiating negotiation.', delay: 1500 },
    { id: '3', sender: 'bank', text: 'Live Agent: How can I help you regarding this account?', delay: 3000 },
    { id: '4', sender: 'ai', text: 'Hi, I am negotiating on behalf of the client. Their payment history is perfect. We request a rate reduction to 15% to match current market offers.', delay: 5000 },
    { id: '5', sender: 'bank', text: 'Checking eligibility...', delay: 7000 },
    { id: '6', sender: 'bank', text: 'We can approve a reduction to 15.24% for the next 12 months.', delay: 9000 },
    { id: '7', sender: 'ai', text: 'Offer accepted. Please confirm update to account.', delay: 10500 },
    { id: '8', sender: 'system', text: 'Success! Annual Percentage Rate lowered from 24.99% → 15.24%. Estimated savings: $512.', delay: 12000 },
];

export default function DemoChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeouts: number[] = [];

        // Reset
        setMessages([]);

        INITIAL_MESSAGES.forEach((msg) => {
            // Show typing indicator before message
            const typeStart = setTimeout(() => setIsTyping(true), msg.delay - 1000 > 0 ? msg.delay - 1000 : 0);

            const showMsg = setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, msg]);
            }, msg.delay);

            timeouts.push(typeStart, showMsg);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <div className="w-full max-w-md mx-auto relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-2xl blur opacity-30"></div>
            <div className="relative glass-panel overflow-hidden flex flex-col h-[500px] bg-white/80">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 bg-white/50 backdrop-blur-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Breathe AI Agent</h3>
                        <div className="flex items-center text-xs text-green-600 font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                            Active Negotiation
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4" ref={scrollRef}>
                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.sender === 'ai' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`
                                max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm
                                ${msg.sender === 'ai'
                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                        : msg.sender === 'system'
                                            ? 'bg-slate-100 text-slate-600 text-center mx-auto text-xs py-1 px-3 border border-slate-200'
                                            : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                                    }
                            `}>
                                    {msg.sender === 'bank' && (
                                        <div className="flex items-center gap-1 text-xs text-slate-400 mb-1 font-medium">
                                            <Building2 size={10} /> Chase Bank
                                        </div>
                                    )}
                                    {msg.sender === 'system' && <ShieldCheck size={12} className="inline mr-1" />}
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-slate-200 rounded-full py-2 px-4 flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Input Placeholder */}
                <div className="p-3 border-t border-slate-100 bg-slate-50">
                    <div className="h-10 bg-white rounded-lg border border-slate-200 flex items-center px-4 text-slate-400 text-sm">
                        AI is handling this conversation...
                    </div>
                </div>
            </div>
        </div>
    );
}
