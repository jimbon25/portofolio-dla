import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 max-w-2xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-4 text-primary"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Contact
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300 mb-8"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Want to collaborate or have a question? Reach out via email or connect on social media!
      </motion.p>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
        <input type="email" placeholder="Your Email" className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" />
        <textarea placeholder="Your Message" className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900" rows={4} />
        <button type="submit" className="px-6 py-3 bg-primary text-white rounded hover:bg-primary-dark transition-colors">Send Message</button>
      </form>
    </section>
  );
}
