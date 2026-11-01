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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-surface border border-gold/30 shadow-2xl p-6 sm:p-8 text-ink overflow-hidden">
        
        {/* Ambient Warm Glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-gold/15 filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 rounded-full bg-rose/15 filter blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-ink-2 hover:text-ink hover:bg-surface-2 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Lotus Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold/15 border border-gold/40 mb-3 shadow-inner">
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
          <h2 id="auth-modal-title" className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
            {isLogin ? 'Welcome Back' : 'Begin Your Journey'}
          </h2>
          <p className="text-xs text-ink-2 mt-1">
            {isLogin
              ? 'Sign in to access your custom events & vendor checklists'
              : 'Create an account to design and organize unforgettable occasions'}
          </p>
        </div>

        {/* Tabs: Sign In / Sign Up */}
        <div className="flex rounded-xl bg-surface-2 p-1 border border-line mb-6">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              isLogin
                ? 'bg-gradient-to-r from-[#D97736] to-[#E5A855] text-[#12090E] shadow-md'
                : 'text-ink-2 hover:text-ink'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              !isLogin
                ? 'bg-gradient-to-r from-[#D97736] to-[#E5A855] text-[#12090E] shadow-md'
                : 'text-ink-2 hover:text-ink'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-ink mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-ink-2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Raikwar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input pl-10 text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-ink mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-ink-2" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10 text-sm"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-ink mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-ink-2" />
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input pl-10 text-sm"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-ink mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-ink-2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10 text-sm"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-ink mb-1">Primary Celebration Type</label>
              <select
                value={prefCategory}
                onChange={(e) => setPrefCategory(e.target.value)}
                className="input text-sm"
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
            <div className="flex items-center justify-between text-xs text-ink-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-line accent-gold" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-gold-ink hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-sheen w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#E07A5F] via-[#EEA862] to-[#F5C97B] text-[#241015] font-semibold text-sm shadow-md flex items-center justify-center gap-2"
          >
            <span>{isLogin ? 'Sign In to Account' : 'Create My Free Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Sign-In */}
        <div className="mt-5 pt-4 border-t border-line text-center">
          <p className="text-xs text-ink-2 mb-2.5">Testing or exploring?</p>
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full py-2.5 rounded-xl bg-surface-2 hover:bg-line/50 border border-gold/30 text-xs font-semibold text-gold-ink transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant 1-Click Demo Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};

