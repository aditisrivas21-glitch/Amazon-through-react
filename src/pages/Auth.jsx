import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';
import { IoMailOutline, IoLockClosedOutline, IoPersonOutline, IoKeyOutline } from 'react-icons/io5';

export const Auth = () => {
  const { login, register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [isLoginTab, setIsLoginTab] = useState(true);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validations
    if (!email.trim() || !email.includes('@')) {
      addToast("Please provide a valid email", "warning");
      return;
    }

    if (password.length < 6) {
      addToast("Password must be at least 6 characters long", "warning");
      return;
    }

    if (isLoginTab) {
      // Login flow
      const res = login(email, password);
      if (res.success) {
        addToast(res.message, "success");
        navigate('/');
      } else {
        addToast(res.message, "warning");
      }
    } else {
      // Registration flow
      if (!username.trim()) {
        addToast("Please enter a username", "warning");
        return;
      }
      if (password !== confirmPassword) {
        addToast("Passwords do not match", "warning");
        return;
      }

      const res = register(username, email, password);
      if (res.success) {
        addToast(res.message, "success");
        navigate('/');
      } else {
        addToast(res.message, "warning");
      }
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col relative overflow-hidden"
      >
        {/* Amazon logo banner */}
        <div className="flex flex-col items-center gap-1.5 mb-6 text-center">
          <div className="flex items-center gap-1">
            <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
              AmaZone
            </span>
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Premium Shopping Account</p>
        </div>

        {/* Tab Selection Header */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 mb-6 relative">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`flex-grow py-3 text-center text-sm font-bold transition-all relative cursor-pointer ${
              isLoginTab ? 'text-amber-500' : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            Sign In
            {isLoginTab && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
            )}
          </button>
          
          <button
            onClick={() => setIsLoginTab(false)}
            className={`flex-grow py-3 text-center text-sm font-bold transition-all relative cursor-pointer ${
              !isLoginTab ? 'text-amber-500' : 'text-slate-400 hover:text-slate-650'
            }`}
          >
            Create Account
            {!isLoginTab && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
            )}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          
          {/* Username Input - Signup only */}
          {!isLoginTab && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Name</label>
              <div className="flex items-center h-11 border border-slate-200 dark:border-slate-800 rounded-xl px-3 bg-slate-50 dark:bg-slate-950 focus-within:ring-2 focus-within:ring-amber-500/40">
                <IoPersonOutline className="text-slate-400 mr-2 h-5 w-5" />
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-xs font-semibold bg-transparent border-none outline-none text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="flex items-center h-11 border border-slate-200 dark:border-slate-800 rounded-xl px-3 bg-slate-50 dark:bg-slate-950 focus-within:ring-2 focus-within:ring-amber-500/40">
              <IoMailOutline className="text-slate-400 mr-2 h-5 w-5" />
              <input 
                type="email" 
                placeholder="example@domain.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs font-semibold bg-transparent border-none outline-none text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="flex items-center h-11 border border-slate-200 dark:border-slate-800 rounded-xl px-3 bg-slate-50 dark:bg-slate-950 focus-within:ring-2 focus-within:ring-amber-500/40">
              <IoLockClosedOutline className="text-slate-400 mr-2 h-5 w-5" />
              <input 
                type="password" 
                placeholder="••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs font-semibold bg-transparent border-none outline-none text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Confirm Password Input - Signup only */}
          {!isLoginTab && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Re-enter Password</label>
              <div className="flex items-center h-11 border border-slate-200 dark:border-slate-800 rounded-xl px-3 bg-slate-50 dark:bg-slate-950 focus-within:ring-2 focus-within:ring-amber-500/40">
                <IoKeyOutline className="text-slate-400 mr-2 h-5 w-5" />
                <input 
                  type="password" 
                  placeholder="••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-xs font-semibold bg-transparent border-none outline-none text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>
          )}

          {/* Checkout note - Login only */}
          {isLoginTab && (
            <div className="text-[11px] text-slate-400 text-right hover:text-amber-500 cursor-pointer font-bold mt-1">
              Forgot password?
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn-primary w-full py-3 mt-4 text-xs tracking-wider uppercase font-bold cursor-pointer"
          >
            {isLoginTab ? 'Sign In to Account' : 'Register Account'}
          </button>
        </form>

        {/* Demo instructions overlay banner */}
        <div className="mt-6 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-center">
          <p className="text-[10px] text-slate-400 font-bold leading-normal">
            DEMO ACCOUNT INFO:<br />
            Register any account to login. Registered details persist in your localStorage!
          </p>
        </div>

      </motion.div>
    </div>
  );
};
