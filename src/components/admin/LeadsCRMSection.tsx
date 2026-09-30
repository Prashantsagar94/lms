import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { LeadRecord } from '../../types';
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Trash2,
  Filter,
  Search,
  Bot,
  ExternalLink,
  Sparkles,
  PhoneCall,
  Clock,
  UserCheck
} from 'lucide-react';

export const LeadsCRMSection: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead } = useLMS();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.city && lead.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.interestedCourseTitle && lead.interestedCourseTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleStartEditNote = (lead: LeadRecord) => {
    setEditingNotesId(lead.id);
    setNoteText(lead.notes || '');
  };

  const handleSaveNote = (leadId: string, currentStatus: LeadRecord['status']) => {
    updateLeadStatus(leadId, currentStatus, noteText);
    setEditingNotesId(null);
  };

  const getStatusBadge = (status: LeadRecord['status']) => {
    switch (status) {
      case 'NEW':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'CONTACTED':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'ENROLLED':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'FOLLOW_UP':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
            <Bot className="w-4 h-4" />
            <span>AI COUNSELOR & WEBSITE ADMISSION LEADS CRM</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            Student Inquiries & Generated Leads ({leads.length})
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Real-time pipeline of inquiries captured automatically by HunarBot AI Counselor and website forms. Call leads, log counselor notes, and update admission stages.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono font-bold">
            {leads.filter(l => l.status === 'NEW').length} New Uncontacted
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold">
            {leads.filter(l => l.status === 'ENROLLED').length} Converted
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, city, or trade..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
          {['ALL', 'NEW', 'CONTACTED', 'FOLLOW_UP', 'ENROLLED'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-3">Lead Name & Phone</th>
                <th className="py-3 px-3">Location / City</th>
                <th className="py-3 px-3">Course of Interest & Goal</th>
                <th className="py-3 px-3">Source & Date</th>
                <th className="py-3 px-3">Stage / Status</th>
                <th className="py-3 px-3">Counselor Notes</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-white text-sm flex items-center gap-1.5">
                      <span>{lead.name}</span>
                      {lead.source === 'AI_BOT' && (
                        <span className="px-1 py-0.2 rounded text-[9px] bg-amber-500/20 text-amber-300 font-mono">
                          AI
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-amber-400 text-xs mt-0.5 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-400" />
                      <a href={`tel:${lead.phone}`} className="hover:underline">
                        {lead.phone}
                      </a>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{lead.city || 'Not specified'}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">
                      {lead.interestedCourseTitle || 'General Vocational Inquiry'}
                    </div>
                    {lead.learningGoal && (
                      <div className="text-[11px] text-slate-400 max-w-xs truncate">
                        Goal: {lead.learningGoal}
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-slate-400">
                    <div>{lead.capturedAt}</div>
                    <span className="text-[10px] text-slate-500">via {lead.source}</span>
                  </td>

                  <td className="py-3 px-3">
                    <select
                      value={lead.status}
                      onChange={e => updateLeadStatus(lead.id, e.target.value as LeadRecord['status'])}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none bg-slate-950 cursor-pointer ${getStatusBadge(lead.status)}`}
                    >
                      <option value="NEW">NEW LEAD</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="FOLLOW_UP">FOLLOW UP</option>
                      <option value="ENROLLED">ENROLLED (CONVERTED)</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>
                  </td>

                  <td className="py-3 px-3 max-w-xs">
                    {editingNotesId === lead.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={noteText}
                          onChange={e => setNoteText(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                          placeholder="e.g. Sent syllabus via WhatsApp..."
                        />
                        <button
                          onClick={() => handleSaveNote(lead.id, lead.status)}
                          className="px-2 py-1 bg-amber-400 text-slate-950 font-bold rounded text-[11px]"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleStartEditNote(lead)}
                        className="text-[11px] text-slate-400 hover:text-white cursor-pointer italic truncate bg-slate-950/40 p-1.5 rounded border border-slate-800"
                        title="Click to edit notes"
                      >
                        {lead.notes || 'Click to add counselor note...'}
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                    <a
                      href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)},%20this%20is%20from%20HunarSetu%20Vocational%20Academy%20regarding%20your%20inquiry.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors border border-emerald-500/30"
                      title="Chat on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors border border-slate-700"
                      title="Call Lead"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setDeleteConfirmId(lead.id)}
                      className="inline-flex p-1.5 bg-slate-800 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-slate-700"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-500 text-xs">
                    No leads matching current search/filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Lead Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-white text-base">Delete Lead Record</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete this enquiry record?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteLead(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
