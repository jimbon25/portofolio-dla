import { motion } from 'framer-motion';

export default function AskMeAnything() {
  return (
    <section id="ama" className="py-20 px-4 max-w-2xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-4 text-primary"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Ask Me Anything (Gemini API Placeholder)
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300 mb-8"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        This section is a placeholder for future Gemini API integration. Users will be able to ask questions and get instant answers here.
      </motion.p>
      <div className="p-6 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-center">
        [Gemini API integration coming soon]
      </div>
    </section>
  );
}
