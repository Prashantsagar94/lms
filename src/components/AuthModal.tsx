import React, { useState, useEffect } from 'react';
import { useLMS } from '../context/LMSContext';
import { UserRole } from '../types';
import {
  X,
  Lock,
  CheckCircle,
  KeyRound,
  Mail,
  User,
  ShieldCheck,
  Building
} from 'lucide-react';
import { DIRECTOR_INFO } from '../data/coursesData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginUser, registerStudent } = useLMS();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setFeedback('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const lowerEmail = email.trim().toLowerCase();
    const isAdmin =
      lowerEmail === 'prashantsagarmepl@gmail.com' ||
      lowerEmail.includes('admin') ||
      name.toLowerCase().includes('prashant');

    const role: UserRole = isAdmin ? 'admin' : 'student';
    const finalName = isAdmin
      ? 'Prashant Sagar (Director)'
      : name.trim() || email.split('@')[0];

    if (isRegister && !isAdmin) {
      const newStudent = registerStudent({
        name: finalName,
        email: lowerEmail,
        phone: phone.trim() || '+91 98765 43210',
        password: password.trim() || 'student123'
      });

      setFeedback(`Registration successful! Generated Student ID: ${newStudent.id}. You can now browse all courses.`);
      setTimeout(() => {
        onSuccess('student');
        onClose();
      }, 800);
      return;
    }

    loginUser(
      email.trim(),
      role,
      finalName,
      phone.trim() || (isAdmin ? '7800897677' : '+91 98765 43210')
    );

    setFeedback(
      isAdmin
        ? 'Welcome Director Prashant Sagar! Routing to Admin Management...'
        : `Welcome ${finalName}! Routing to Student Portal...`
    );

    setTimeout(() => {
      onSuccess(role);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                {isRegister ? 'New Student Registration' : 'HunarSetu LMS Portal Login'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Single sign-in for Students & Admin Authority
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Head Office Trust Stamp */}
        <div className="px-6 py-2 bg-amber-500/10 border-b border-amber-500/20 text-[11px] text-amber-300 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Building className="w-3.5 h-3.5" /> Barabanki Head Office
          </span>
          <span className="font-mono">Helpline: 7800897677</span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {feedback && (
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {isRegister && (
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}

            <div>
              <label className="text-slate-300 font-medium block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {isRegister && (
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Mobile Number (Calling & WhatsApp)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            )}

            <div>
              <label className="text-slate-300 font-medium block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm mt-2 cursor-pointer"
            >
              {isRegister ? 'Register Account' : 'Sign In to LMS'}
            </button>
          </form>

          <div className="text-center pt-2 text-[11px] text-slate-400">
            {isRegister ? 'Already registered?' : "Need a new student account?"}{' '}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-amber-400 hover:underline font-semibold ml-1 cursor-pointer"
            >
              {isRegister ? 'Log in here' : 'Register now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
