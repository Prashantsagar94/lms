import React, { useState } from 'react';
import { useLMS } from '../context/LMSContext';
import {
  X,
  Mail,
  CheckCircle2,
  Clock,
  Send,
  FileText
} from 'lucide-react';
import { EmailNotification } from '../types';

export const EmailLogsModal: React.FC = () => {
  const { isEmailLogsOpen, setIsEmailLogsOpen, emails } = useLMS();
  const [selectedEmail, setSelectedEmail] = useState<EmailNotification | null>(emails[0] || null);

  if (!isEmailLogsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Automated Transactional Email Dispatch Logs
              </h3>
              <p className="text-[11px] text-slate-400">
                System emails dispatched for enrollments, tax receipts, and automated PDF certificates
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEmailLogsOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-Pane Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Pane: Email List */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-800 overflow-y-auto divide-y divide-slate-800/60 bg-slate-950/40">
            {emails.map(eml => {
              const isSelected = selectedEmail?.id === eml.id;

              return (
                <button
                  key={eml.id}
                  onClick={() => setSelectedEmail(eml)}
                  className={`w-full p-3.5 text-left transition-colors flex flex-col gap-1 focus:outline-none ${
                    isSelected
                      ? 'bg-amber-500/10 border-l-2 border-amber-400 text-white'
                      : 'hover:bg-slate-900/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono">{new Date(eml.sentAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Dispatched
                    </span>
                  </div>

                  <h5 className="text-xs font-semibold truncate text-white">
                    {eml.subject}
                  </h5>

                  <p className="text-[11px] text-slate-400 truncate">
                    To: {eml.recipientName} ({eml.recipientEmail})
                  </p>
                </button>
              );
            })}

            {emails.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500">
                No email dispatch logs found.
              </div>
            )}
          </div>

          {/* Right Pane: Selected Email View */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-900/40">
            {selectedEmail ? (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono uppercase bg-amber-500/10 border border-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                      {selectedEmail.type}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {new Date(selectedEmail.sentAt).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-display">
                    {selectedEmail.subject}
                  </h4>

                  <div className="text-xs text-slate-400 font-mono">
                    <div>From: HunarSetu LMS Dispatcher &lt;no-reply@hunarsetu.edu.in&gt;</div>
                    <div>To: {selectedEmail.recipientName} &lt;{selectedEmail.recipientEmail}&gt;</div>
                  </div>
                </div>

                {/* Email Body */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                  {selectedEmail.body}
                </div>

                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5 pt-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SMTP TLS 1.3 Verified · Delivered to recipient inbox</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 py-16 text-xs">
                Select an email from the list to view its payload.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
