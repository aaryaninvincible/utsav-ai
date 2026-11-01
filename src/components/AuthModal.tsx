import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  tier?: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [prefCategory, setPrefCategory] = useState('Weddings');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserProfile = {
      name: isLogin ? (name.trim() || email.split('@')[0] || 'Aryan Raikwar') : name,
      email: email.trim() || 'aryan@example.com',
      phone: phone.trim() || '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      tier: 'VIP Host',
    };
    localStorage.setItem('utsav_user', JSON.stringify(user));
    onSuccess(user);
    onClose();
  };

  const handleDemoSignIn = () => {
    const demoUser: UserProfile = {
      name: 'Aryan Raikwar',
      email: 'aryan@utsav.ai',
      phone: '+91 98765 43210',
      tier: 'VIP Host',
    };
    localStorage.setItem('utsav_user', JSON.stringify(demoUser));
    onSuccess(demoUser);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-[#140B10]/95 border border-[#E5A855]/30 shadow-[0_0_60px_rgba(229,168,85,0.2)] p-6 sm:p-8 text-white overflow-hidden">
        
        {/* Ambient Warm Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-[#E5A855]/20 filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-[#D97736]/20 filter blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Lotus Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E5A855]/30 to-[#D97736]/10 border border-[#E5A855]/40 mb-3 shadow-inner">
            <Sparkles className="w-6 h-6 text-[#E5A855]" />
          </div>
          <h2 id="auth-modal-title" className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {isLogin ? 'Welcome Back' : 'Begin Your Journey'}
          </h2>
          <p className="text-xs text-white/60 mt-1">
            {isLogin
              ? 'Sign in to access your custom events & vendor quotes'
              : 'Create an account to design and organize unforgettable occasions'}
          </p>
        </div>

        {/* Tabs: Sign In / Sign Up */}
        <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              isLogin
                ? 'bg-gradient-to-r from-[#D97736] to-[#E5A855] text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              !isLogin
                ? 'bg-gradient-to-r from-[#D97736] to-[#E5A855] text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-white/80 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Raikwar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-white/30 focus:border-[#E5A855] focus:outline-none focus:ring-1 focus:ring-[#E5A855]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-white/80 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-white/30 focus:border-[#E5A855] focus:outline-none focus:ring-1 focus:ring-[#E5A855]"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-white/80 mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-white/30 focus:border-[#E5A855] focus:outline-none focus:ring-1 focus:ring-[#E5A855]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-white/80 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-white/30 focus:border-[#E5A855] focus:outline-none focus:ring-1 focus:ring-[#E5A855]"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-white/80 mb-1">Primary Celebration Type</label>
              <select
                value={prefCategory}
                onChange={(e) => setPrefCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#1C1016] border border-white/15 text-sm text-white focus:border-[#E5A855] focus:outline-none"
              >
                <option value="Weddings">Royal Weddings</option>
                <option value="Festivals">Festivals & Cultural</option>
                <option value="Birthdays">Birthday Parties</option>
                <option value="Corporate">Corporate Galas & Summits</option>
                <option value="College">College Fests</option>
              </select>
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between text-xs text-white/60 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-white/20 accent-[#E5A855]" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-[#E5A855] hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#D97736] via-[#E5A855] to-[#C87A32] text-white font-semibold text-sm shadow-[0_0_25px_rgba(229,168,85,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>{isLogin ? 'Sign In to Account' : 'Create My Free Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Sign-In */}
        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-white/50 mb-2.5">Testing or exploring?</p>
          <button
            onClick={handleDemoSignIn}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-[#E5A855]/30 text-xs font-semibold text-[#E5A855] transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant 1-Click Demo Sign In (Aryan Raikwar)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
