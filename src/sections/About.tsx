import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 max-w-3xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-4 text-primary"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        I am a passionate developer with experience in building modern, responsive, and accessible web applications. I love working with new technologies and creating delightful user experiences.
      </motion.p>
    </section>
  );
}
