import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import {
  Sliders,
  Save,
  CheckCircle2,
  Bell,
  Globe,
  Phone,
  Mail,
  MapPin,
  User,
  Quote,
  TrendingUp,
  Award,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';

export const WebsiteManualSettingsSection: React.FC = () => {
  const { websiteSettings, adminUpdateWebsiteSettings } = useLMS();

  const [customDomain, setCustomDomain] = useState(websiteSettings.customDomain || 'hunarsetu.online');
  const [websiteUrl, setWebsiteUrl] = useState(websiteSettings.websiteUrl || 'https://hunarsetu.online');
  const [copiedDns, setCopiedDns] = useState<string | null>(null);

  const [ticker, setTicker] = useState(websiteSettings.announcementTicker);
  const [headline, setHeadline] = useState(websiteSettings.heroHeadline);
  const [subheadline, setSubheadline] = useState(websiteSettings.heroSubheadline);
  const [phone, setPhone] = useState(websiteSettings.helplinePhone);
  const [email, setEmail] = useState(websiteSettings.helplineEmail);
  const [address, setAddress] = useState(websiteSettings.headOfficeAddress);
  const [director, setDirector] = useState(websiteSettings.directorName);
  const [message, setMessage] = useState(websiteSettings.directorMessage);
  const [trainedCount, setTrainedCount] = useState(websiteSettings.statsTrainedStudents);
  const [placementRate, setPlacementRate] = useState(websiteSettings.statsPlacementRate);
  const [centersCount, setCentersCount] = useState(websiteSettings.statsPartnerCenters);
  const [certCount, setCertCount] = useState(websiteSettings.statsSkillCertificates);
  const [bannerActive, setBannerActive] = useState(websiteSettings.bannerAlertActive);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCopyDns = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDns(key);
    setTimeout(() => setCopiedDns(null), 2000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    adminUpdateWebsiteSettings({
      customDomain: customDomain.trim() || 'hunarsetu.online',
      websiteUrl: websiteUrl.trim() || 'https://hunarsetu.online',
      announcementTicker: ticker,
      heroHeadline: headline,
      heroSubheadline: subheadline,
      helplinePhone: phone,
      helplineEmail: email,
      headOfficeAddress: address,
      directorName: director,
      directorMessage: message,
      statsTrainedStudents: Number(trainedCount) || 12000,
      statsPlacementRate: Number(placementRate) || 85,
      statsPartnerCenters: Number(centersCount) || 40,
      statsSkillCertificates: Number(certCount) || 11000,
      bannerAlertActive: bannerActive
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleResetDefaults = () => {
    setCustomDomain('hunarsetu.online');
    setWebsiteUrl('https://hunarsetu.online');
    setTicker('⚡ Admissions Open for 2026 Batch! Government Recognized Skill Certification · Call Barabanki Head Office: 7800897677');
    setHeadline('हुनर से रोज़गार तक — A Skill Bridge for Self-Reliance');
    setSubheadline('Empowering youths, women artisans, and entrepreneurs with certified vocational training in Garment Making, Embroidery, Bridal Mehndi, and Beauty Wellness.');
    setPhone('7800897677');
    setEmail('prashantsagarmepl@gmail.com');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
            <Sliders className="w-4 h-4" />
            <span>FULL WEBSITE DASHBOARD MANUAL FEEDING CONTROL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            Website Manual Feed & Live Site Settings
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Admin full control over website ticker alerts, hero headlines, official contact channels, institutional impact metrics, and Director messages in real-time.
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">Website settings updated successfully! Changes are live across the entire LMS platform.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* CUSTOM DOMAIN SETUP & DNS STATUS CARD (hunarsetu.online) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border-2 border-amber-500/30 rounded-2xl p-6 space-y-5 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-display">
                    Custom Domain Connection
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active & Connected
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Primary Domain: <strong className="text-amber-400 font-mono">hunarsetu.online</strong> · Purchased by Director Prashant Sagar
                </p>
              </div>
            </div>

            <a
              href="https://hunarsetu.online"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Visit hunarsetu.online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Domain configuration input fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Connected Domain Hostname
              </label>
              <input
                type="text"
                value={customDomain}
                onChange={e => setCustomDomain(e.target.value)}
                placeholder="e.g. hunarsetu.online"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-amber-300 font-mono outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Canonical HTTPS URL
              </label>
              <input
                type="text"
                value={websiteUrl}
                onChange={e => setWebsiteUrl(e.target.value)}
                placeholder="e.g. https://hunarsetu.online"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* DNS Configuration Guide for Registrar */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>DNS Records Setup Guide for Your Domain Registrar (GoDaddy, Hostinger, Namecheap, etc.):</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              To point your domain <strong className="text-white">hunarsetu.online</strong> to this AI Studio / Cloud Run web application, add the following two DNS records in your domain DNS management dashboard:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] font-mono">
                  <tr>
                    <th className="px-3 py-2 border-b border-slate-800">Method</th>
                    <th className="px-3 py-2 border-b border-slate-800">Host / Type</th>
                    <th className="px-3 py-2 border-b border-slate-800">Target Value / Points To</th>
                    <th className="px-3 py-2 border-b border-slate-800 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {/* Method 1: Instant URL Forwarding (Recommended for GoDaddy/Hostinger) */}
                  <tr className="hover:bg-slate-900/50 bg-amber-500/5">
                    <td className="px-3 py-2.5 text-amber-400 font-bold font-sans">
                      Option 1: Domain Forwarding (Easiest)
                    </td>
                    <td className="px-3 py-2.5 text-white">
                      @ &amp; www (Forwarding)
                    </td>
                    <td className="px-3 py-2.5 text-amber-300 font-mono text-[10px] truncate max-w-xs">
                      https://ais-pre-ocl4nod7ajunp27xemuqxm-92406485776.asia-east1.run.app
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopyDns('https://ais-pre-ocl4nod7ajunp27xemuqxm-92406485776.asia-east1.run.app', 'fwd')}
                        className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] cursor-pointer inline-flex items-center gap-1 font-sans"
                      >
                        {copiedDns === 'fwd' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedDns === 'fwd' ? 'Copied URL' : 'Copy URL'}</span>
                      </button>
                    </td>
                  </tr>

                  {/* Method 2: CNAME */}
                  <tr className="hover:bg-slate-900/50">
                    <td className="px-3 py-2.5 text-slate-300 font-sans">
                      Option 2: DNS CNAME
                    </td>
                    <td className="px-3 py-2.5 text-white">CNAME: www</td>
                    <td className="px-3 py-2.5 text-slate-300 truncate max-w-xs font-mono text-[10px]">
                      ais-pre-ocl4nod7ajunp27xemuqxm-92406485776.asia-east1.run.app
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopyDns('ais-pre-ocl4nod7ajunp27xemuqxm-92406485776.asia-east1.run.app', 'cname')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] cursor-pointer inline-flex items-center gap-1 font-sans"
                      >
                        {copiedDns === 'cname' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedDns === 'cname' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Ready-made message for Domain Registrar Customer Support */}
            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">
                Don't want to change DNS yourself? Copy this message and paste it to your GoDaddy / Hostinger customer support chat:
              </span>
              <button
                type="button"
                onClick={() => {
                  const supportMsg = `Hello support, I have purchased domain hunarsetu.online. Please help me set up domain forwarding / redirection:
Domain: hunarsetu.online and www.hunarsetu.online
Forward / Redirect to: https://ais-pre-ocl4nod7ajunp27xemuqxm-92406485776.asia-east1.run.app
Redirect Type: Permanent 301 (with HTTPS enabled)
Thank you!`;
                  handleCopyDns(supportMsg, 'support_msg');
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedDns === 'support_msg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDns === 'support_msg' ? 'Copied Support Message!' : 'Copy Support Chat Message'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Free SSL/TLS certificate will automatically be issued within 15–30 minutes once forwarding or DNS propagates.</span>
            </div>
          </div>
        </div>

        {/* Section 1: Live Announcement Ticker & Top Alert */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Live Announcement Ticker & Top Alert Banner</h3>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={bannerActive}
                onChange={e => setBannerActive(e.target.checked)}
                className="rounded text-amber-500 focus:ring-0"
              />
              <span>Display on Top Header</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Top Announcement Ticker Text (Broadcasted on all public pages)
            </label>
            <input
              type="text"
              value={ticker}
              onChange={e => setTicker(e.target.value)}
              placeholder="e.g. ⚡ Admissions Open for 2026 Batch! Call: 7800897677"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Section 2: Hero Section Headlines & Copy */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Globe className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Main Homepage Hero Messaging</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Hero Main Headline (H1)
              </label>
              <input
                type="text"
                value={headline}
                onChange={e => setHeadline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-400 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Hero Sub-Headline / Mission Description
              </label>
              <textarea
                rows={3}
                value={subheadline}
                onChange={e => setSubheadline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Official Contact & Headquarters Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Phone className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Institutional Contact & Leadership Control</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Official Helpline Mobile / WhatsApp
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Director & Head of Vocational Skilling
              </label>
              <input
                type="text"
                value={director}
                onChange={e => setDirector(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Head Office Registered Address
              </label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-300 mb-1">
                Director's Official Message to Students
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Manual Statistical Counters */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Live Platform Impact Counters</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Total Trained Students</label>
              <input
                type="number"
                value={trainedCount}
                onChange={e => setTrainedCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-amber-400 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Placement / Self-Employment %</label>
              <input
                type="number"
                value={placementRate}
                onChange={e => setPlacementRate(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-emerald-400 font-mono outline-none focus:border-amber-400 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Partner Skill Centers</label>
              <input
                type="number"
                value={centersCount}
                onChange={e => setCentersCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 font-mono outline-none focus:border-amber-400 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Issued Certificates</label>
              <input
                type="number"
                value={certCount}
                onChange={e => setCertCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-cyan-400 font-mono outline-none focus:border-amber-400 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply Live to Entire Website</span>
          </button>
        </div>
      </form>
    </div>
  );
};
