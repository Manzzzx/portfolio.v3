/**
 * 404 Not Found Page
 * 
 * Custom 404 page yang ditampilkan ketika route tidak ditemukan.
 * File ini akan otomatis di-render oleh Next.js untuk invalid routes.
 * 
 * @module app/not-found
 * 
 * Next.js akan otomatis render not-found.tsx ketika:
 * - User mengakses route yang tidak exist
 * - notFound() function dipanggil di server component
 * 
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/not-found
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Not Found Component
 * 
 * Menampilkan 404 error page dengan winter theme.
 * Includes navigation back to home dan fun illustration.
 * 
 * @example
 * Otomatis di-render ketika user mengakses route yang tidak ada.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#101c2c] via-[#1a2333] to-[#101c2c] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-[150px] sm:text-[200px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8DD8FF] via-[#5ab7d8] to-[#8DD8FF] leading-none">
            404
          </h1>
        </motion.div>

        {/* Lost Snowman Illustration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8 text-8xl"
        >
          ⛄
        </motion.div>

        {/* Error Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Page Not Found
        </motion.h2>

        {/* Error Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-blue-100/80 text-lg mb-8 max-w-md mx-auto"
        >
          Oops! Looks like this page got lost in a snowstorm. 
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Go Home Button */}
          <Link
            href="/"
            className="px-8 py-3 bg-[#8DD8FF]/20 hover:bg-[#8DD8FF]/30 text-[#8DD8FF] rounded-xl transition-all duration-300 font-semibold border border-[#8DD8FF]/30 hover:border-[#8DD8FF]/50 backdrop-blur-sm"
          >
            Go Home
          </Link>

          {/* View Projects Button */}
          <Link
            href="/projects"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 font-semibold border border-white/20 hover:border-white/30 backdrop-blur-sm"
          >
            View Projects
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 flex justify-center gap-4 text-4xl"
        >
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            ❄️
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            ❄️
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            ❄️
          </motion.span>
        </motion.div>

        {/* Fun Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-white/40 text-sm"
        >
          Error Code: 404 | Page Not Found
        </motion.p>
      </motion.div>
    </div>
  );
}
