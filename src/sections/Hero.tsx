import SocialIcons from '../components/SocialIcons';
import ThemeToggle from '../components/ThemeToggle';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-background to-transparent dark:from-gray-900 dark:to-gray-950">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src="/images/profile-placeholder.svg"
          alt="Profile Placeholder"
          className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-primary/30 shadow-lg bg-gray-100 dark:bg-gray-800"
          draggable={false}
        />
      </motion.div>
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Hi, I'm <span className="text-primary">Dimas Luis Aditya</span>
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl mb-8 max-w-xl mx-auto text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        A modern web developer passionate about building beautiful, performant, and accessible digital experiences.
      </motion.p>
      <SocialIcons />
    </section>
  );
}
