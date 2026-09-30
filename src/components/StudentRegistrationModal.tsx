import React, { useState } from 'react';
import { useLMS } from '../context/LMSContext';
import confetti from 'canvas-confetti';
import {
  X,
  UserPlus,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  Lock,
  MapPin,
  QrCode,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
  Clock,
  Award
} from 'lucide-react';

interface StudentRegistrationModalProps {
  onOpenAuth?: () => void;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({ onOpenAuth }) => {
  const {
    studentRegistrationCourse,
    setStudentRegistrationCourse,
    setPaymentModalCourse,
    registerStudent
  } = useLMS();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Barabanki');
  const [password, setPassword] = useState('');
  const [registeredStudentId, setRegisteredStudentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!studentRegistrationCourse) return null;

  const course = studentRegistrationCourse;

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    setIsSubmitting(true);

    const newStudent = registerStudent({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim() || 'Barabanki',
      password: password.trim() || 'student123',
      interestedCourse: course
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }

    setRegisteredStudentId(newStudent.id);
    setIsSubmitting(false);
  };

  const handleProceedToPayment = () => {
    const targetCourse = course;
    setStudentRegistrationCourse(null);
    setRegisteredStudentId(null);
    // Open payment modal with QR code & upi id prashant.sagar7@axl
    setPaymentModalCourse(targetCourse);
  };

  const handleBrowseCourses = () => {
    setStudentRegistrationCourse(null);
    setRegisteredStudentId(null);
  };

  const handleSwitchToLogin = () => {
    setStudentRegistrationCourse(null);
    if (onOpenAuth) {
      onOpenAuth();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-[#0D1322] border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                {registeredStudentId ? 'Registration Confirmed!' : 'Student Registration / विद्यार्थी पंजीकरण'}
              </h3>
              <p className="text-[11px] text-slate-400">
                National Vocational Skilling Mission · Barabanki Head Office
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setStudentRegistrationCourse(null);
              setRegisteredStudentId(null);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* STEP 2: POST-REGISTRATION SUCCESS SCREEN */}
          {registeredStudentId ? (
            <div className="space-y-6 py-2 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10 animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-xs font-bold">
                  Permanent Student ID: {registeredStudentId}
                </span>
                <h4 className="text-xl font-bold font-display text-white mt-2">
                  Welcome to HunarSetu, {name}!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                  Your official student account and automatic ID have been generated. You can now browse all vocational courses. Once your subsidized course fee is paid via UPI QR, your video lessons, curriculum modules, and certification will immediately unlock.
                </p>
              </div>

              {/* Course Being Enrolled Preview */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left flex items-center gap-4">
                {course.imageUrl && (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    Selected Trade
                  </div>
                  <h5 className="text-sm font-bold text-white truncate">{course.title}</h5>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>{course.durationDays} Days Duration</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-bold font-mono">₹{course.fee.toLocaleString('en-IN')} Subsidized Fee</span>
                  </div>
                </div>
              </div>

              {/* Two Prominent Action Paths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Option 1: Browse Other Courses */}
                <button
                  onClick={handleBrowseCourses}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex flex-col items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                    <Compass className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-sm font-bold">Browse Courses First</span>
                  <span className="text-[11px] text-slate-400">
                    Explore all trades & syllabus
                  </span>
                </button>

                {/* Option 2: Pay Fee with QR */}
                <button
                  onClick={handleProceedToPayment}
                  className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-xl transition-all cursor-pointer group text-center"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-slate-950" />
                  </div>
                  <span className="text-sm font-bold">Pay Fee with QR Now</span>
                  <span className="text-[11px] font-mono opacity-90">
                    prashant.sagar7@axl (₹{course.fee.toLocaleString('en-IN')})
                  </span>
                </button>
              </div>
            </div>
          ) : (
            /* STEP 1: REGISTRATION FORM */
            <div className="space-y-5">
              {/* Selected Course Quick Card */}
              <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 font-display font-bold text-lg">
                    {course.category === 'Garment Making' ? '✂️' : course.category === 'Embroidery' ? '🪡' : course.category === 'Mehndi Art' ? '🌿' : '✨'}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-400">
                      Enrolling In
                    </span>
                    <h4 className="text-sm font-bold text-white leading-snug line-clamp-1">
                      {course.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{course.hindiTitle}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block">Subsidized Fee</span>
                  <span className="text-base font-bold font-mono text-amber-400">
                    ₹{course.fee.toLocaleString('en-IN')}
                  </span>
                  <div className="text-[10px] text-emerald-400 font-medium">
                    {course.durationDays} Days
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmitRegistration} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Student Full Name / पूरा नाम *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Pooja Verma"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      WhatsApp / Mobile No. *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      City / District / शहर
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="e.g. Barabanki, Lucknow"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Create Password (for LMS Login)
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Create student password"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Benefits Bullet Points */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Included with Your Student Account:</span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Government Recognized Certificate upon completion</span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Pay course fee seamlessly via UPI QR (prashant.sagar7@axl)</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register Student & Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Already Registered link */}
              <div className="text-center pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                Already registered with HunarSetu?{' '}
                <button
                  type="button"
                  onClick={handleSwitchToLogin}
                  className="text-amber-400 hover:underline font-semibold ml-1 cursor-pointer"
                >
                  Sign in here
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
