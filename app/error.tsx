/**
 * Global Error Boundary
 * 
 * Error boundary untuk handle runtime errors di aplikasi.
 * File ini akan catch errors dan menampilkan fallback UI yang user-friendly.
 * 
 * @module app/error
 * 
 * Next.js akan otomatis wrap route segments dengan error boundary ini.
 * Ketika error terjadi, component ini akan di-render sebagai pengganti.
 * 
 * Docs: https://nextjs.org/docs/app/building-your-application/routing/error-handling
 */

'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Error Component Props
 * 
 * @param error - Error object yang di-throw
 * @param reset - Function untuk retry/reset error boundary
 */
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error Boundary Component
 * 
 * Menampilkan error UI dengan winter theme yang konsisten dengan design portfolio.
 * User bisa retry dengan click tombol "Try Again".
 * 
 * @example
 * Error ini akan otomatis di-trigger ketika ada runtime error di route.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error ke console untuk debugging
    console.error('Application error:', error);
    
    // TODO: Bisa tambahkan error tracking service di sini
    // Contoh: Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#101c2c] via-[#1a2333] to-[#101c2c] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-block p-6 bg-red-500/20 rounded-full border border-red-500/30">
            <svg
              className="w-16 h-16 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </motion.div>

        {/* Error Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Oops! Something went wrong
        </motion.h1>

        {/* Error Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-blue-100/80 text-lg mb-2"
        >
          We encountered an unexpected error.
        </motion.p>

        {/* Error Message (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <p className="text-sm text-red-300 font-mono break-all">
              {error.message}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          {/* Try Again Button */}
          <button
            onClick={reset}
            className="px-8 py-3 bg-[#8DD8FF]/20 hover:bg-[#8DD8FF]/30 text-[#8DD8FF] rounded-xl transition-all duration-300 font-semibold border border-[#8DD8FF]/30 hover:border-[#8DD8FF]/50 backdrop-blur-sm"
          >
            Try Again
          </button>

          {/* Go Home Button */}
          <a
            href="/"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 font-semibold border border-white/20 hover:border-white/30 backdrop-blur-sm"
          >
            Go Home
          </a>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 text-white/30 text-sm"
        >
          <p>❄️ Don't worry, we'll get this fixed! ❄️</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
