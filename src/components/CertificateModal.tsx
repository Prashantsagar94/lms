import React, { useRef, useState } from 'react';
import { useLMS } from '../context/LMSContext';
import { jsPDF } from 'jspdf';
import {
  X,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle,
  Share2,
  Award
} from 'lucide-react';

export const CertificateModal: React.FC = () => {
  const { viewingCertificate, setViewingCertificate } = useLMS();
  const certRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!viewingCertificate) return null;

  const cert = viewingCertificate;

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      // Generate clean vector PDF using jsPDF
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Page dimensions
      const pageWidth = 297;
      const pageHeight = 210;

      // Outer border
      doc.setDrawColor(217, 119, 6); // Amber gold
      doc.setLineWidth(2);
      doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

      // Inner thin border
      doc.setDrawColor(180, 83, 9);
      doc.setLineWidth(0.5);
      doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

      // Background subtle tint
      doc.setFillColor(254, 252, 246);
      doc.rect(13, 13, pageWidth - 26, pageHeight - 26, 'F');

      // Header Brand
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(10);
      doc.text('NATIONAL VOCATIONAL SKILL TRAINING & ENTREPRENEURSHIP COUNCIL', pageWidth / 2, 24, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(180, 83, 9);
      doc.text('HUNARSETU VOCATIONAL SKILL ACADEMY', pageWidth / 2, 35, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(217, 119, 6);
      doc.text('BARABANKI HEAD OFFICE, UTTAR PRADESH', pageWidth / 2, 42, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text('GOVERNMENT RECOGNIZED VOCATIONAL TRAINING PROGRAMME · HELPLINE: 7800897677', pageWidth / 2, 48, { align: 'center' });

      // Title
      doc.setFont('times', 'bolditalic');
      doc.setFontSize(26);
      doc.setTextColor(15, 23, 42);
      doc.text('Certificate of Vocational Competency', pageWidth / 2, 60, { align: 'center' });

      // Body text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(71, 85, 105);
      doc.text('This is to proudly certify that', pageWidth / 2, 74, { align: 'center' });

      // Student Name
      doc.setFont('times', 'bold');
      doc.setFontSize(28);
      doc.setTextColor(180, 83, 9);
      doc.text(cert.studentName, pageWidth / 2, 88, { align: 'center' });

      // Underline under student name
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(0.8);
      doc.line(pageWidth / 2 - 60, 91, pageWidth / 2 + 60, 91);

      // Accomplishment statement
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(51, 65, 85);
      doc.text('has successfully completed the intensive hands-on practical training curriculum for', pageWidth / 2, 102, { align: 'center' });

      // Course Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(15, 23, 42);
      doc.text(cert.courseTitle, pageWidth / 2, 113, { align: 'center' });

      // Duration & Category
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(100, 116, 139);
      doc.text(`Duration: ${cert.durationDays} Days Practical Fieldwork · Grade: ${cert.grade} (Distinction)`, pageWidth / 2, 122, { align: 'center' });

      // Details footer box
      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(25, 134, pageWidth - 50, 24, 2, 2, 'FD');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text('CERTIFICATE ID', 35, 142);
      doc.text('ISSUE DATE', 105, 142);
      doc.text('VERIFICATION CODE', 170, 142);
      doc.text('SECURITY STATUS', 230, 142);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(cert.id, 35, 150);
      doc.text(cert.issueDate, 105, 150);
      doc.text(cert.verificationCode, 170, 150);
      doc.setTextColor(22, 163, 74);
      doc.text('AUTHENTIC / VERIFIED', 230, 150);

      // Signatures
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.5);
      doc.line(35, 182, 95, 182);
      doc.line(pageWidth - 95, 182, pageWidth - 35, 182);

      // Prashant Sagar handwritten signature in vector deep blue
      doc.setFont('times', 'bolditalic');
      doc.setFontSize(16);
      doc.setTextColor(15, 43, 92); // Royal dark navy ink
      doc.text('Prashant Sagar', 65, 177, { align: 'center' });
      // Flourish stroke
      doc.setDrawColor(15, 43, 92);
      doc.setLineWidth(0.6);
      doc.line(48, 179, 82, 178);

      doc.setFont('times', 'italic');
      doc.setFontSize(13);
      doc.setTextColor(51, 65, 85);
      doc.text('Craft Council Board', pageWidth - 65, 177, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text('PRASHANT SAGAR (DIRECTOR)', 65, 188, { align: 'center' });
      doc.text('MASTER EVALUATION COUNCIL', pageWidth - 65, 188, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('Barabanki Head Office, Uttar Pradesh', 65, 192, { align: 'center' });
      doc.text('National Vocational Skilling Panel', pageWidth - 65, 192, { align: 'center' });

      // Iconic Official Circular Seal in Center with Ribbons
      // Ceremonial Ribbon Tails
      doc.setFillColor(180, 83, 9); // Amber-800
      doc.triangle(pageWidth / 2 - 7, 184, pageWidth / 2 - 2, 196, pageWidth / 2 - 10, 196, 'F');
      doc.triangle(pageWidth / 2 + 7, 184, pageWidth / 2 + 10, 196, pageWidth / 2 + 2, 196, 'F');

      // Outer gold circle
      doc.setDrawColor(217, 119, 6);
      doc.setLineWidth(1.2);
      doc.setFillColor(254, 243, 199);
      doc.circle(pageWidth / 2, 176, 14, 'FD');

      // Inner dashed gold ring
      doc.setDrawColor(180, 83, 9);
      doc.setLineWidth(0.4);
      doc.circle(pageWidth / 2, 176, 11.5, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(146, 64, 14);
      doc.text('★ HUNARSETU ACADEMY ★', pageWidth / 2, 171, { align: 'center' });

      doc.setFontSize(8);
      doc.setTextColor(120, 53, 15);
      doc.text('PRASHANT SAGAR', pageWidth / 2, 176, { align: 'center' });

      doc.setFontSize(5.5);
      doc.setTextColor(180, 83, 9);
      doc.text('DIRECTOR · BARABANKI H.O.', pageWidth / 2, 180, { align: 'center' });

      // Save PDF
      doc.save(`Certificate_${cert.studentName.replace(/\s+/g, '_')}_${cert.id}.pdf`);
      setIsGeneratingPdf(false);
    } catch (e) {
      console.error(e);
      setIsGeneratingPdf(false);
      window.print();
    }
  };

  const handleCopyVerification = () => {
    navigator.clipboard.writeText(`${window.location.origin}?verify=${cert.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[95vh]">
        {/* Modal Top Actions */}
        <div className="px-6 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-white">
              Official Vocational Completion Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyVerification}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
            >
              {copiedLink ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Link Copied
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" /> Share Verification
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>

            <button
              disabled={isGeneratingPdf}
              onClick={handleDownloadPdf}
              className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF Certificate'}</span>
            </button>

            <button
              onClick={() => setViewingCertificate(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Visual Canvas (Printable Target) */}
        <div className="p-4 sm:p-8 overflow-y-auto flex items-center justify-center bg-slate-950/60">
          <div
            id="printable-certificate"
            ref={certRef}
            className="w-full max-w-3xl bg-[#FFFDF9] text-slate-900 border-8 border-double border-amber-600/70 p-8 sm:p-12 shadow-2xl relative select-none rounded-lg"
            style={{
              backgroundImage: 'radial-gradient(#fde68a 0.75px, transparent 0.75px)',
              backgroundSize: '16px 16px'
            }}
          >
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 text-amber-600 text-xl font-serif">❖</div>
            <div className="absolute top-2 right-2 text-amber-600 text-xl font-serif">❖</div>
            <div className="absolute bottom-2 left-2 text-amber-600 text-xl font-serif">❖</div>
            <div className="absolute bottom-2 right-2 text-amber-600 text-xl font-serif">❖</div>

            {/* Inner Border */}
            <div className="border border-amber-500/50 p-6 sm:p-8 space-y-6 text-center">
              {/* Institution Header */}
              <div className="space-y-1">
                <div className="text-[10px] sm:text-xs font-bold font-mono tracking-widest text-slate-500 uppercase">
                  National Skill Development & Vocational Training Council
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-amber-900">
                  HUNARSETU VOCATIONAL SKILL ACADEMY
                </h2>
                <div className="text-[11px] font-semibold text-amber-800">
                  BARABANKI HEAD OFFICE, UTTAR PRADESH · HELPLINE: 7800897677
                </div>
                <div className="text-[10px] text-slate-500">
                  Autonomous Institute for Women & Youth Vocational Empowerment
                </div>
              </div>

              {/* Decorative Title */}
              <div className="py-2">
                <div className="inline-block relative">
                  <span className="text-xl sm:text-3xl font-serif italic text-slate-900 font-bold">
                    Certificate of Vocational Competency
                  </span>
                  <div className="w-32 h-0.5 bg-amber-600 mx-auto mt-2" />
                </div>
              </div>

              {/* Recipient Details */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-slate-600">
                  This is proudly presented and awarded to
                </p>
                <div className="text-2xl sm:text-4xl font-serif font-bold text-amber-900 tracking-wide underline decoration-amber-400 decoration-2 underline-offset-8">
                  {cert.studentName}
                </div>
              </div>

              {/* Course statement */}
              <div className="space-y-1 max-w-xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>
                  for successfully undergoing and completing the intensive professional vocational skilling curriculum in:
                </p>
                <div className="text-base sm:text-lg font-bold text-slate-900 pt-1 font-display">
                  {cert.courseTitle}
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Duration: {cert.durationDays} Days Comprehensive Practical Training · Grade Awarded: {cert.grade} (Distinction)
                </p>
              </div>

              {/* Verification & Metadata Ribbon */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 text-[10px] sm:text-xs text-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                <div>
                  <span className="text-slate-400 block text-[9px]">CERTIFICATE ID</span>
                  <span className="font-bold text-slate-900">{cert.id}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">ISSUE DATE</span>
                  <span className="font-bold text-slate-900">{cert.issueDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">VERIFICATION CODE</span>
                  <span className="font-bold text-slate-900">{cert.verificationCode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">REGISTRY STATUS</span>
                  <span className="font-bold text-emerald-700">VERIFIED & ACTIVE</span>
                </div>
              </div>

              {/* Signatures & Seal Section */}
              <div className="pt-6 grid grid-cols-3 items-end justify-between gap-4">
                {/* Signatory 1 - Prashant Sagar with handwritten signature */}
                <div className="text-center space-y-1.5">
                  <div className="h-14 flex items-center justify-center">
                    <svg viewBox="0 0 190 55" className="h-12 w-44 stroke-[#0d2a58] fill-none" xmlns="http://www.w3.org/2000/svg">
                      {/* Fluid initial 'P' with curved ascender, loop and downward pressure */}
                      <path d="M 22 42 C 22 18, 23 11, 27 9 C 34 6, 46 8, 43 21 C 41 30, 27 31, 21 31" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M 26 18 Q 33 36 36 43" strokeWidth="1.9" strokeLinecap="round" />
                      {/* 'r-a-s-h-a-n-t' natural cursive connector */}
                      <path d="M 40 32 C 44 27, 48 28, 52 30 Q 58 33, 62 29 C 66 25, 70 26, 73 31 C 76 35, 79 24, 83 22 L 83 33 Q 86 24, 92 28 C 96 32, 99 28, 104 31 C 108 33, 111 24, 116 27 L 115 34" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
                      {/* 't' cross stroke with upward flick */}
                      <path d="M 110 24 L 121 24" strokeWidth="1.8" strokeLinecap="round" />
                      {/* Capital 'S' with sweeping flourish */}
                      <path d="M 126 33 C 122 26, 128 17, 137 15 C 145 13, 148 20, 143 25 C 137 29, 130 33, 139 38 C 145 41, 154 37, 156 32" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      {/* 'a-g-a-r' flowing cursive script */}
                      <path d="M 158 30 C 161 26, 166 27, 168 31 Q 172 26, 175 32 C 176 39, 172 45, 167 46 C 163 46, 166 40, 172 34 Q 177 28, 181 30 C 185 32, 188 28, 192 29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Dynamic pen flourish underline with ink trail */}
                      <path d="M 24 46 Q 80 44 140 43 Q 175 42 195 38" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                      <path d="M 170 48 L 190 48" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                    </svg>
                  </div>
                  <div className="w-32 sm:w-40 h-0.5 bg-slate-500 mx-auto" />
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                    Prashant Sagar (Director)
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-slate-600">
                    HunarSetu Academy, Barabanki Head Office
                  </div>
                </div>

                {/* Iconic Official Emblem Seal with Hanging Ribbons */}
                <div className="flex flex-col items-center justify-center relative min-h-[110px] pb-4">
                  {/* Ceremonial Hanging Ribbon Tails behind seal */}
                  <div className="absolute bottom-0 flex gap-2.5 z-0 pointer-events-none">
                    <div className="w-4 h-7 bg-gradient-to-b from-amber-700 via-amber-800 to-red-900 shadow-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)' }} />
                    <div className="w-4 h-7 bg-gradient-to-b from-amber-700 via-amber-800 to-red-900 shadow-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)' }} />
                  </div>

                  {/* Outer Gold Medallion with Raised Border & Precision Fit */}
                  <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-1 shadow-xl border-2 border-amber-300 flex items-center justify-center">
                    {/* Serrated Star Ring */}
                    <div className="w-full h-full rounded-full border-2 border-dashed border-amber-900/60 p-0.5 flex items-center justify-center bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600">
                      <div className="w-full h-full rounded-full border border-amber-950/40 p-1 flex flex-col items-center justify-center text-center text-slate-950 font-serif shadow-inner bg-gradient-to-tr from-yellow-300 to-amber-400">
                        <div className="text-[6.5px] sm:text-[7.5px] font-bold tracking-tighter uppercase text-amber-950 leading-none">
                          ★ HUNARSETU ★
                        </div>
                        <div className="my-0.5 text-amber-900 font-extrabold text-[9px] sm:text-[10px] leading-tight font-display tracking-tight">
                          PRASHANT<br />SAGAR
                        </div>
                        <div className="text-[6px] sm:text-[7px] font-bold text-amber-950 uppercase tracking-widest leading-none">
                          DIRECTOR
                        </div>
                        <div className="text-[5px] sm:text-[6px] text-amber-900 tracking-wider font-mono mt-0.5 font-bold">
                          BARABANKI H.O.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signatory 2 */}
                <div className="text-center space-y-1.5">
                  <div className="h-14 flex items-center justify-center">
                    <svg viewBox="0 0 180 50" className="h-12 w-40 text-slate-800 stroke-current fill-none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 22 28 Q 30 14 42 16 Q 52 18 50 30 Q 48 38 62 25 L 75 22 Q 82 35 90 20 L 105 28 Q 115 15 125 32 L 140 24 Q 155 35 165 22" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M 30 38 Q 95 36 160 34" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                    </svg>
                  </div>
                  <div className="w-32 sm:w-40 h-0.5 bg-slate-500 mx-auto" />
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                    Chief Technical Assessor
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-slate-600">
                    National Artisan Guild
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographically sealed record. Ready for employment & trade licensing.</span>
          </div>
          <span className="font-mono text-[11px]">ID: {cert.id}</span>
        </div>
      </div>
    </div>
  );
};
