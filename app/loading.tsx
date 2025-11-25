/**
 * Global Loading State
 * 
 * Loading UI yang ditampilkan saat route sedang loading.
 * File ini akan otomatis di-render oleh Next.js selama Suspense boundary loading.
 * 
 * @module app/loading
 * 
 * Next.js akan otomatis wrap route segments dengan Suspense dan gunakan loading.tsx
 * sebagai fallback UI selama component sedang di-fetch.
 * 
 * Docs: https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
 */

'use client';

import { motion } from 'framer-motion';

/**
 * Loading Component
 * 
 * Menampilkan loading skeleton dengan winter theme.
 * Design konsisten dengan overall portfolio aesthetic.
 * 
 * @example
 * Loading ini akan otomatis di-trigger saat navigasi antar pages
 * atau saat component sedang fetch data.
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#101c2c] via-[#1a2333] to-[#101c2c] -z-10" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        {/* Animated Snowflake Loader */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="inline-block mb-6"
        >
          <svg
            className="w-16 h-16 text-[#8DD8FF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-blue-100/60">Please wait a moment</p>
        </motion.div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="w-2 h-2 bg-[#8DD8FF] rounded-full"
            />
          ))}
        </div>

        {/* Decorative Snowflake */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-4xl"
        >
          ❄️
        </motion.div>
      </motion.div>
    </div>
  );
}
