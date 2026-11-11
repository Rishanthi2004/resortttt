import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useScrollSectionVisible } from './ScrollSection';

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isVisible = useScrollSectionVisible();
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please provide your name and email.');
      return;
    }
    setSubmitted(true);
  };

  const contactItems = [
    { icon: Phone, label: 'Telephone', value: '+39 0463 90 8820', mono: true },
    { icon: Mail, label: 'Confidential Email', value: 'concierge@aura.it', mono: true },
    { icon: MapPin, label: 'Location', value: 'Italian Dolomites', mono: false },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF8F5] dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800/80 transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Resort Details with Staggered Slide-In */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -28 }}
              animate={
                isVisible
                  ? { opacity: 1, x: 0 }
                  : shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -20 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.25 : 0.7,
                delay: isVisible && !shouldReduceMotion ? 0.08 : 0,
                ease: LUXURY_EASE,
              }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-amber-700 dark:text-amber-300/80 font-medium mb-2">
                Concierge & Inquiries
              </p>
              <h2 className="text-3xl md:text-4xl font-serif-luxury text-stone-900 dark:text-stone-100 font-normal tracking-tight">
                Connect With Us
              </h2>
              <p className="mt-3 text-xs md:text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed">
                Our private concierge is available 24/7 to assist with villa reservations, helicopter arrivals, and bespoke requests.
              </p>
            </motion.div>

            <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                    animate={
                      isVisible
                        ? { opacity: 1, x: 0 }
                        : shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, x: -16 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0.2 : 0.55,
                      delay: isVisible && !shouldReduceMotion ? 0.16 + idx * 0.08 : 0,
                      ease: LUXURY_EASE,
                    }}
                    className="flex items-start gap-3"
                  >
                    <Icon className="w-4 h-4 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-medium text-stone-900 dark:text-stone-200">{item.label}</span>
                      <span className={`text-stone-600 dark:text-stone-400 ${item.mono ? 'font-mono text-[11px]' : ''}`}>
                        {item.value}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Elevated Form Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 34, scale: 0.96 }}
            animate={
              isVisible
                ? { opacity: 1, y: 0, scale: 1 }
                : shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 26, scale: 0.96 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.25 : 0.75,
              delay: isVisible && !shouldReduceMotion ? 0.16 : 0,
              ease: LUXURY_EASE,
            }}
            className="lg:col-span-7 bg-white dark:bg-stone-900 p-6 md:p-8 border border-stone-200 dark:border-stone-800 shadow-sm dark:shadow-none"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="submitted"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASE }}
                  className="text-center py-10 space-y-3"
                >
                  <motion.div
                    initial={shouldReduceMotion ? undefined : { scale: 0.5, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.08 }}
                    className="inline-flex p-3 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/40 rounded-full"
                  >
                    <CheckCircle2 className="w-6 h-6 text-amber-700 dark:text-amber-300" />
                  </motion.div>
                  <h4 className="text-xl font-serif-luxury text-stone-900 dark:text-stone-100">
                    Message Transmitted
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Our guest relations team will respond to <strong>{email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    type="button"
                    className="mt-4 text-xs tracking-wider uppercase text-amber-800 dark:text-amber-200 hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-wider uppercase text-stone-600 dark:text-stone-400 mb-1 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Lord Alexander Sinclair"
                        className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2 px-3 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-wider uppercase text-stone-600 dark:text-stone-400 mb-1 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sinclair@private.ch"
                        className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2 px-3 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-wider uppercase text-stone-600 dark:text-stone-400 mb-1 font-medium">
                      Message or Special Requests
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Inquire about dates, private helicopter transfer, dietary needs, or bespoke stay arrangements."
                      className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-200 text-xs py-2 px-3 focus:outline-none focus:border-amber-600 dark:focus:border-amber-300 rounded-none transition-colors"
                    />
                  </div>

                  <motion.button
                    whileHover={shouldReduceMotion ? undefined : { y: -1.5 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    type="submit"
                    className="w-full py-2.5 px-5 bg-amber-100 hover:bg-amber-200 text-stone-950 text-xs tracking-[0.2em] uppercase font-medium transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
