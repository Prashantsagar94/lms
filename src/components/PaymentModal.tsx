import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { useLMS } from '../context/LMSContext';
import {
  X,
  QrCode,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  Clock,
  CreditCard,
  Building,
  Smartphone,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Compass
} from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const {
    paymentModalCourse,
    setPaymentModalCourse,
    enrollInCourse,
    currentUser,
    setActivePlayerState
  } = useLMS();

  const [paymentTab, setPaymentTab] = useState<'UPI_QR' | 'UPI_ID' | 'CARD' | 'NETBANKING'>('UPI_QR');
  const [utrNumber, setUtrNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 mins
  const [errorMessage, setErrorMessage] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Official UPI ID requested
  const upiVpa = 'prashant.sagar7@axl';
  const payeeName = 'Prashant Sagar';

  // Standard UPI URI format for Indian BHIM/UPI Apps
  const upiUri = paymentModalCourse
    ? `upi://pay?pa=${upiVpa}&pn=${encodeURIComponent(payeeName)}&am=${paymentModalCourse.fee}&cu=INR&tn=${encodeURIComponent('HunarSetu ' + paymentModalCourse.title.slice(0, 25))}`
    : '';

  // Generate real scannable QR Code
  useEffect(() => {
    if (!paymentModalCourse || !upiUri) return;
    QRCode.toDataURL(upiUri, {
      width: 320,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    })
      .then(url => {
        setQrDataUrl(url);
      })
      .catch(err => {
        console.error('Error generating QR code:', err);
      });
  }, [paymentModalCourse, upiUri]);

  // Timer countdown
  useEffect(() => {
    if (!paymentModalCourse) return;
    setCountdown(300);
    const interval = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [paymentModalCourse]);

  if (!paymentModalCourse) return null;

  const course = paymentModalCourse;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedTimer = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiVpa);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCompletePayment = async (providedUtr?: string) => {
    setErrorMessage('');
    const inputUtr = providedUtr?.trim() || utrNumber.trim();

    if (paymentTab === 'UPI_QR') {
      if (!inputUtr) {
        setErrorMessage('Please enter the 12-digit UPI Transaction / UTR number from your payment app receipt (Google Pay, PhonePe, Paytm, etc.).');
        return;
      }
      if (inputUtr.length < 6) {
        setErrorMessage('Invalid UTR format. Please enter the full UPI transaction reference number (typically 12 digits).');
        return;
      }
    }

    let finalUtr = inputUtr;
    if (paymentTab === 'UPI_ID' && !finalUtr) {
      finalUtr = `UPI/COLLECT/${Date.now().toString().slice(-8)}`;
    } else if (paymentTab === 'CARD' && !finalUtr) {
      finalUtr = `CARD/TXN/${Date.now().toString().slice(-8)}`;
    } else if (paymentTab === 'NETBANKING' && !finalUtr) {
      finalUtr = `NET/TXN/${Date.now().toString().slice(-8)}`;
    }

    setIsProcessing(true);

    try {
      const newEnrollment = await enrollInCourse(course.id, paymentTab, finalUtr);

      setIsProcessing(false);
      setPaymentModalCourse(null);

      // Trigger celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }

      // Open first lesson now that payment is verified & completed
      const firstMod = course.modules[0];
      const firstLesson = firstMod?.lessons[0];
      if (firstMod && firstLesson) {
        setActivePlayerState({
          course,
          module: firstMod,
          lesson: firstLesson
        });
      }
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err.message || 'Payment processing failed. Please retry.');
    }
  };

  // Render authentic high-resolution UPI QR Code
  const renderUpiQrDisplay = () => {
    return (
      <div className="relative bg-white p-3 rounded-2xl border-2 border-slate-700 inline-block shadow-2xl">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="UPI QR Code - Scan to Pay"
            className="w-52 h-52 sm:w-56 sm:h-56 mx-auto rounded-lg"
          />
        ) : (
          <div className="w-52 h-52 flex items-center justify-center text-slate-800 text-xs font-mono">
            Generating UPI QR...
          </div>
        )}

        <div className="bg-slate-900 text-white p-2 rounded-xl mt-2 text-center">
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
            UPI PAYEE: {payeeName}
          </div>
          <div className="text-xs font-mono font-bold text-emerald-400">
            ₹{course.fee.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-[#0F172A] border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Official Fee Payment & Admission Checkout
              </h3>
              <p className="text-xs text-slate-400">
                Course: <span className="text-slate-200 font-semibold">{course.title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setPaymentModalCourse(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Course Summary & Subsidized Fee Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-amber-400 font-mono font-semibold">
                {course.durationDays} Days Vocational Programme · Barabanki Head Office
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">{course.title}</h4>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>Enrolling: <strong className="text-slate-200">{currentUser.name || 'Registered Student'}</strong></span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{currentUser.phone || '+91 78008 97677'}</span>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
              <span className="text-xs text-slate-400">Total Subsidized Fee</span>
              <div className="text-2xl font-bold font-mono text-amber-400">
                ₹{course.fee.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Government Recognized</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Select Fee Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentTab('UPI_QR')}
                className={`p-3 rounded-xl border text-left transition-colors flex flex-col gap-1 focus:outline-none cursor-pointer ${
                  paymentTab === 'UPI_QR'
                    ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Scan UPI QR</span>
                <span className="text-[10px] text-slate-400">PhonePe, GPay, Paytm</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentTab('UPI_ID')}
                className={`p-3 rounded-xl border text-left transition-colors flex flex-col gap-1 focus:outline-none cursor-pointer ${
                  paymentTab === 'UPI_ID'
                    ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">UPI ID / VPA</span>
                <span className="text-[10px] text-slate-400">{upiVpa}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentTab('CARD')}
                className={`p-3 rounded-xl border text-left transition-colors flex flex-col gap-1 focus:outline-none cursor-pointer ${
                  paymentTab === 'CARD'
                    ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Debit / Credit</span>
                <span className="text-[10px] text-slate-400">RuPay, Visa, MC</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentTab('NETBANKING')}
                className={`p-3 rounded-xl border text-left transition-colors flex flex-col gap-1 focus:outline-none cursor-pointer ${
                  paymentTab === 'NETBANKING'
                    ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Building className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">NetBanking</span>
                <span className="text-[10px] text-slate-400">SBI, PNB, HDFC</span>
              </button>
            </div>
          </div>

          {/* TAB 1: SCAN UPI QR CODE (REQUESTED WITH upi id prashant.sagar7@axl AND QR) */}
          {paymentTab === 'UPI_QR' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
              <div className="shrink-0 text-center space-y-2">
                {renderUpiQrDisplay()}
                <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Active Session: {formattedTimer}
                </div>
              </div>

              <div className="space-y-4 flex-1 w-full text-xs">
                <div>
                  <h5 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>How to Pay with Any UPI App:</span>
                  </h5>
                  <ol className="text-slate-300 space-y-1.5 mt-2 list-decimal list-inside text-xs leading-relaxed">
                    <li>Open <strong>PhonePe, Google Pay, Paytm, BHIM, or Cred</strong>.</li>
                    <li>Scan the official QR code on the left.</li>
                    <li>Verify receiver UPI ID: <strong className="text-amber-400 font-mono">{upiVpa}</strong></li>
                    <li>Verify payee name: <strong className="text-white">{payeeName}</strong></li>
                    <li>Pay subsidized fee: <strong className="text-emerald-400 font-mono">₹{course.fee.toLocaleString('en-IN')}</strong></li>
                  </ol>
                </div>

                {/* Copy Official UPI ID prashant.sagar7@axl */}
                <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/30 flex items-center justify-between shadow-inner">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase font-semibold">
                      Attached Official UPI ID
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-amber-400 tracking-wide mt-0.5">
                      {upiVpa}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Payee: {payeeName}
                    </div>
                  </div>

                  <button
                    onClick={handleCopyUpi}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1 transition-colors shadow cursor-pointer"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-slate-950" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy UPI ID
                      </>
                    )}
                  </button>
                </div>

                {/* Mobile Direct Pay Deep Link */}
                <div className="flex gap-2">
                  <a
                    href={upiUri}
                    className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-center font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>Open in Mobile UPI App</span>
                  </a>
                </div>

                {/* UTR Input & Submit Confirmation */}
                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <label className="block text-xs font-semibold text-slate-200">
                    Step 2: Enter 12-Digit UPI Transaction / UTR Number from your payment app:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={utrNumber}
                      onChange={e => {
                        setUtrNumber(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="e.g. 427918239014 (12-digit UTR)"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      disabled={isProcessing}
                      onClick={() => handleCompletePayment()}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-1.5">Verifying UTR...</span>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Submit UTR & Unlock Course</span>
                        </>
                      )}
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    Once you transfer the fee of <strong className="text-emerald-400 font-mono">₹{course.fee.toLocaleString('en-IN')}</strong> to UPI ID <strong className="text-amber-400 font-mono">{upiVpa}</strong>, paste the 12-digit UTR/UPI Ref number here to unlock all training lessons.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UPI ID DIRECT COLLECT */}
          {paymentTab === 'UPI_ID' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  Pay to Attached Official UPI ID:
                </label>
                <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">{upiVpa}</span>
                    <span className="text-[10px] text-slate-400 block font-sans">Payee: {payeeName} (HunarSetu Academy)</span>
                  </div>
                  <button
                    onClick={handleCopyUpi}
                    className="px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                  >
                    {copiedUpi ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  Or enter your UPI ID to request collect payment:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. yourname@oksbi or 9876543210@paytm"
                    defaultValue="student@paytm"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <button
                    disabled={isProcessing}
                    onClick={() => handleCompletePayment()}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl whitespace-nowrap cursor-pointer"
                  >
                    Request Collect
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CARD */}
          {paymentTab === 'CARD' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Direct RuPay / Visa / MasterCard Checkout</span>
                <span className="font-mono text-amber-400 font-bold">₹{course.fee.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="text"
                placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                defaultValue="4111 2222 3333 4444"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  defaultValue="12/28"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  defaultValue="123"
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>
              <button
                disabled={isProcessing}
                onClick={() => handleCompletePayment()}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-lg"
              >
                Pay ₹{course.fee.toLocaleString('en-IN')} via Card
              </button>
            </div>
          )}

          {/* TAB 4: NETBANKING */}
          {paymentTab === 'NETBANKING' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3.5">
              <label className="text-xs text-slate-300 font-semibold block">Select Your Bank</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none">
                <option>State Bank of India (SBI)</option>
                <option>Punjab National Bank (PNB)</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Bank of Baroda</option>
              </select>
              <button
                disabled={isProcessing}
                onClick={() => handleCompletePayment()}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer shadow-lg"
              >
                Proceed to NetBanking Payment
              </button>
            </div>
          )}

          {/* Option to Browse Other Courses & Pay Later */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
            <button
              onClick={() => setPaymentModalCourse(null)}
              className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Browse other courses & pay later</span>
            </button>

            <span className="text-[11px] text-slate-500 font-mono">
              Barabanki Head Office: 7800897677
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
