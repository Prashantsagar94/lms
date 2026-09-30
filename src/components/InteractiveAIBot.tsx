import React, { useState, useRef, useEffect } from 'react';
import { useLMS } from '../context/LMSContext';
import { askHunarAI } from '../services/aiService';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  PhoneCall,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  HelpCircle,
  Clock,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveAIBotProps {
  onSelectTab: (tab: 'courses' | 'dashboard' | 'admin') => void;
  onOpenFranchise: () => void;
  onOpenVerifier: () => void;
  onOpenAuth?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedCourse?: string;
  showLeadFormPrompt?: boolean;
}

export const InteractiveAIBot: React.FC<InteractiveAIBotProps> = ({
  onSelectTab,
  onOpenFranchise,
  onOpenVerifier,
  onOpenAuth
}) => {
  const { courses, websiteSettings, addLead } = useLMS();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Namaste! 🙏 I am **HunarBot**, your 24/7 AI Educational Counselor for HunarSetu Vocational Academy.\n\nI can answer ANY question about course syllabuses, sewing techniques, fees, certifications, or self-employment boutique setups. How can I help you today?`,
      timestamp: 'Just now'
    }
  ]);

  // Lead Generation form state inside the bot
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCity, setLeadCity] = useState('');
  const [leadCourse, setLeadCourse] = useState(courses[0]?.title || 'Silai Machine Operator');
  const [leadGoal, setLeadGoal] = useState('Want to start my own boutique/salon');
  const [leadSubmittedSuccess, setLeadSubmittedSuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isThinking, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsThinking(true);

    try {
      const response = await askHunarAI(
        textToSend,
        courses,
        websiteSettings.directorName,
        websiteSettings.helplinePhone
      );

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedCourse: response.suggestedCourse,
        showLeadFormPrompt: response.promptLeadCapture
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `I'm here to assist you! For immediate admissions or batch details, call Director Prashant Sagar's office directly at **${websiteSettings.helplinePhone}** or click "Request Callback" below.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showLeadFormPrompt: true
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;

    // Save lead into LMSContext CRM
    const newLead = addLead({
      name: leadName.trim(),
      phone: leadPhone.trim(),
      city: leadCity.trim() || 'Uttar Pradesh',
      interestedCourseTitle: leadCourse,
      learningGoal: leadGoal,
      source: 'AI_BOT',
      status: 'NEW',
      notes: `Inquired via HunarBot AI Assistant on website. Requested priority admission callback.`
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setLeadSubmittedSuccess(true);
    setTimeout(() => {
      setShowLeadModal(false);
      setLeadSubmittedSuccess(false);
      setLeadName('');
      setLeadPhone('');
      setLeadCity('');

      // Add system message into chat
      setMessages(prev => [
        ...prev,
        {
          id: `lead-ack-${Date.now()}`,
          sender: 'bot',
          text: `🎉 Thank you **${newLead.name}**! Your admission inquiry for **${newLead.interestedCourseTitle}** has been lodged with the Barabanki Head Office (Ref: ${newLead.id}). An educational counselor will call you at **${newLead.phone}** shortly!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 2000);
  };

  const quickQuestions = [
    'What is the fee and duration for Silai Machine Operator?',
    'How do I get an official government recognized certificate?',
    'Can I start a home tailoring boutique after this training?',
    'Which needle size should I use for cotton vs silk fabric?'
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {!isOpen && (
          <div className="mb-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Ask AI Counselor · हुनर सहायक</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center p-4 rounded-full shadow-2xl transition-all duration-300 relative border ${
            isOpen
              ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
              : 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 border-amber-400 hover:scale-105 shadow-amber-500/25 ring-4 ring-amber-500/20'
          }`}
          aria-label="Toggle AI Chatbot"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[440px] max-w-[460px] h-[600px] max-h-[82vh] bg-[#0E131F] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden font-sans backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-[#131B2E] to-slate-900 border-b border-slate-800 px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-100 text-sm">HunarBot · AI Counselor</h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live AI
                  </span>
                </div>
                <p className="text-xs text-slate-400">HunarSetu Academy · Barabanki Head Office</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowLeadModal(true)}
                className="px-2.5 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg transition-colors flex items-center gap-1"
                title="Request Callback"
              >
                <PhoneCall className="w-3 h-3 text-amber-400" />
                <span>Call Me</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Action Top Pill Bar */}
          <div className="bg-slate-950/70 border-b border-slate-800/80 px-3 py-2 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
            <button
              onClick={() => {
                onSelectTab('courses');
                setIsOpen(false);
              }}
              className="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3 text-amber-400" />
              <span>Browse Courses</span>
            </button>
            <button
              onClick={() => {
                onOpenVerifier();
                setIsOpen(false);
              }}
              className="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Verify Certificate</span>
            </button>
            <button
              onClick={() => {
                onOpenFranchise();
                setIsOpen(false);
              }}
              className="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Award className="w-3 h-3 text-purple-400" />
              <span>Franchise Center</span>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-[#0B0F19] to-[#0E1424]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-br-xs'
                      : 'bg-[#161D2F] text-slate-200 border border-slate-700/60 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {msg.text.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                        {line.startsWith('• ') ? (
                          <span className="block pl-2 text-slate-300">{line}</span>
                        ) : line.startsWith('**') && line.endsWith('**') ? (
                          <strong className="text-amber-400">{line.replace(/\*\*/g, '')}</strong>
                        ) : (
                          line.replace(/\*\*/g, '')
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Contextual Lead Button Prompt inside Bot Response */}
                  {msg.showLeadFormPrompt && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex flex-col gap-2">
                      <p className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        Want personal batch consultation & discount?
                      </p>
                      <button
                        onClick={() => {
                          if (msg.suggestedCourse) setLeadCourse(msg.suggestedCourse);
                          setShowLeadModal(true);
                        }}
                        className="w-full py-1.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-all shadow flex items-center justify-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Get Free Call / Syllabus on WhatsApp</span>
                      </button>
                    </div>
                  )}

                  <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-800' : 'text-slate-400'}`}>
                    {msg.timestamp}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 flex-shrink-0 mt-0.5">
                    <UserIcon className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-[#161D2F] border border-slate-700/60 rounded-2xl rounded-bl-xs px-3.5 py-2.5 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></div>
                  <span className="text-xs text-slate-400 ml-1">HunarBot is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Suggestion Chips */}
          <div className="bg-slate-900/90 border-t border-slate-800 px-3 py-2">
            <p className="text-[11px] text-slate-400 mb-1.5 font-medium flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-amber-400" />
              Frequently Asked Questions:
            </p>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="flex-shrink-0 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 px-2.5 py-1 rounded-full border border-slate-700/60 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Ask anything in English, Hindi, or Hinglish..."
              className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-400 text-slate-100 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 outline-none placeholder:text-slate-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isThinking}
              className="p-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 rounded-xl font-bold transition-all shadow-md flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Lead Generation Modal Triggered by Bot */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0F1424] border border-amber-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowLeadModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {leadSubmittedSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Request Successfully Submitted!</h3>
                <p className="text-sm text-slate-300">
                  Our Barabanki counselor will call you at <strong>{leadPhone}</strong> to guide you through admission and fee concessions.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Request Free Course Guidance</h3>
                    <p className="text-xs text-amber-400">Head Office Counselor Callback · Barabanki</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-5 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  Leave your number to receive the full syllabus PDF, fee discount coupon, and personalized guidance from Director Prashant Sagar's advisory team.
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={e => setLeadName(e.target.value)}
                      placeholder="e.g. Pooja Verma"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={e => setLeadPhone(e.target.value)}
                        placeholder="10-digit number"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">City / District</label>
                      <input
                        type="text"
                        value={leadCity}
                        onChange={e => setLeadCity(e.target.value)}
                        placeholder="e.g. Barabanki, Lucknow"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Course of Interest</label>
                    <select
                      value={leadCourse}
                      onChange={e => setLeadCourse(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.title}>
                          {c.title} (₹{c.fee})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Goal / Query</label>
                    <input
                      type="text"
                      value={leadGoal}
                      onChange={e => setLeadGoal(e.target.value)}
                      placeholder="e.g. Want to open ladies boutique at home"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Submit & Request Callback</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
