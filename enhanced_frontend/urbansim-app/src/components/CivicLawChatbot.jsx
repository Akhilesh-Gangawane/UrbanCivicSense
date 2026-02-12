import React, { useState, useRef, useEffect } from 'react';

const GEMINI_API_KEY = "AIzaSyAhAsyL9bZUx_qiJJaignymdEBGaCV8QBw";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are an Indian Civic Law Guidance Assistant integrated into an AI-powered Urban Grievance Redressal System.

Your role is to provide structured, neutral, and informational guidance to citizens in India regarding civic infrastructure issues.

You must focus only on Indian legal frameworks, Indian government departments, and Indian complaint processes.

The system handles issues such as:
- Potholes
- Road accidents due to infrastructure
- Broken streetlights
- Exposed electric wires
- Garbage overflow
- Water leakage
- Open drains or manholes
- Public safety hazards

For every user query:

1. Identify the issue category.
2. Identify the responsible authority in India (Municipal Corporation, PWD, Electricity Board, Water Department, etc.).
3. Mention the relevant Indian legal framework if applicable, such as:
   - Motor Vehicles Act, 1988
   - Electricity Act, 2003
   - Municipal Corporation Act (State-specific)
   - Law of Negligence (Tort Law in India)
   - Article 21 of the Constitution of India (Right to Life)
4. Provide general steps for filing a complaint in India.
5. Mention appropriate forum if accident/injury occurred:
   - Police Station (FIR)
   - Municipal Office
   - Motor Accident Claims Tribunal (MACT)
   - Civil Court (if applicable)
6. Suggest required documents only if relevant (FIR copy, medical report, photographs, complaint ID, etc.).

STRICT RULES:
- Do NOT accuse any government department of negligence.
- Do NOT declare any authority guilty.
- Do NOT estimate compensation amounts.
- Do NOT provide personalized legal advice.
- Do NOT invent Indian laws.
- Do NOT provide complex legal interpretation.
- Only provide high-level informational guidance.
- Maintain a professional, neutral, and respectful tone.
- If the issue is unclear, ask the user to clarify.
- If the issue does not fall under civic infrastructure, suggest contacting local authorities or police.

If issue classification is unclear, respond with:
"I could not confidently determine the issue category. Please clarify whether this relates to Road, Electricity, Water, Sanitation, or an Accident/Injury in India."

Always end every response with:
"This information is for general awareness only and does not constitute legal advice under Indian law."

Response format:
Responsible Authority (India):
Applicable Legal Framework (India):
Complaint Filing Process (India):
Appropriate Forum (if applicable):
Required Documents (if applicable):
Additional Guidance:
Disclaimer:`;

export default function CivicLawChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: 'Namaste! 🙏 I am your Civic Law Guidance Assistant. Ask me anything about urban infrastructure issues, civic complaints, or related Indian laws.\n\nExamples:\n• "There is a pothole near my house"\n• "Exposed wires on my street"\n• "How to file a complaint about garbage?"' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const sendToGemini = async (userMessage) => {
        // Build conversation history for context
        const contents = [
            {
                role: "user",
                parts: [{ text: SYSTEM_PROMPT + "\n\nPlease confirm you understand these instructions." }]
            },
            {
                role: "model",
                parts: [{ text: "Understood. I will act as an Indian Civic Law Guidance Assistant and strictly follow the rules and response format provided. I'm ready to help citizens with their civic infrastructure queries." }]
            },
        ];

        // Add conversation history (skip the initial greeting)
        for (const msg of messages.slice(1)) {
            contents.push({
                role: msg.role === 'model' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            });
        }

        // Add current user message
        contents.push({
            role: "user",
            parts: [{ text: userMessage }]
        });

        const body = {
            contents,
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
        };

        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            console.error('Gemini API Error:', response.status, errData);
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Empty response from Gemini');
        return text;
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userText = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsTyping(true);

        try {
            const aiResponse = await sendToGemini(userText);
            setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
        } catch (error) {
            console.error("Gemini Error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "I apologize, I'm experiencing connectivity issues. Please check your internet connection and try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    // Format AI text with basic markdown-like styling
    const formatText = (text) => {
        return text.split('\n').map((line, i) => {
            // Bold headers (lines ending with colon or starting with **)
            if (line.match(/^\*\*(.*?)\*\*/)) {
                return <p key={i} className="font-bold mt-2 mb-0.5">{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.match(/^(Responsible Authority|Applicable Legal|Complaint Filing|Appropriate Forum|Required Documents|Additional Guidance|Disclaimer)/i)) {
                return <p key={i} className="font-bold text-primary mt-2 mb-0.5">{line}</p>;
            }
            if (line.startsWith('- ') || line.startsWith('• ')) {
                return <p key={i} className="ml-2">• {line.substring(2)}</p>;
            }
            if (line.trim() === '') return <br key={i} />;
            return <p key={i}>{line}</p>;
        });
    };

    return (
        <div className="fixed bottom-24 right-6 z-[100] font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white dark:bg-[#1C1C21] w-[360px] h-[500px] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden mb-4"
                    style={{ animation: 'slideUp 0.3s ease-out' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white flex items-center justify-between shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                                <span className="material-icons-round text-xl">gavel</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold">Civic Law Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] opacity-90">Powered by Gemini AI</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
                            <span className="material-icons-round text-xl">close</span>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 dark:bg-[#16161a]">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {m.role === 'model' && (
                                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                        <span className="material-icons-round text-orange-600 dark:text-orange-400" style={{ fontSize: '14px' }}>gavel</span>
                                    </div>
                                )}
                                <div className={`max-w-[80%] p-3 text-xs leading-relaxed ${m.role === 'user'
                                        ? 'bg-orange-500 text-white rounded-2xl rounded-tr-sm shadow-md'
                                        : 'bg-white dark:bg-[#27272E] text-gray-700 dark:text-gray-200 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-gray-700 shadow-sm'
                                    }`}>
                                    <div className="whitespace-pre-wrap">{m.role === 'model' ? formatText(m.text) : m.text}</div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-2 flex-shrink-0">
                                    <span className="material-icons-round text-orange-600" style={{ fontSize: '14px' }}>gavel</span>
                                </div>
                                <div className="bg-white dark:bg-[#27272E] px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                        <span className="text-[10px] text-gray-400 ml-2">Analyzing...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 bg-white dark:bg-[#1C1C21] border-t border-gray-100 dark:border-gray-800">
                        <div className="relative flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about civic laws..."
                                className="flex-1 bg-gray-50 dark:bg-[#27272E] border-none rounded-xl py-2.5 px-4 text-xs focus:ring-2 focus:ring-orange-500/30 focus:outline-none placeholder-gray-400"
                                disabled={isTyping}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl shadow-lg shadow-orange-500/20 disabled:opacity-40 transition-all active:scale-90 flex-shrink-0"
                            >
                                <span className="material-icons-round" style={{ fontSize: '18px' }}>send</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${isOpen
                        ? 'bg-gray-600 hover:bg-gray-700'
                        : 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                    }`}
            >
                <span className="material-icons-round text-white text-2xl">
                    {isOpen ? 'close' : 'gavel'}
                </span>
                {!isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-white"></span>
                    </span>
                )}
            </button>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
