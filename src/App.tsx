
import Hero from './sections/Hero';
import About from './sections/About';
import TechStack from './sections/TechStack';
import Portfolio from './sections/Portfolio';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import AskMeAnything from './sections/AskMeAnything';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import SocialIcons from './components/SocialIcons';

const nav = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Tech', href: '#tech' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
  { label: 'Ask Me', href: '#ama' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ripple, setRipple] = useState<{x: number, y: number} | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="bg-background dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen font-sans">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/95 border-b border-gray-200 dark:border-gray-800">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <span className="font-bold text-xl text-primary">Portfolio</span>
          <ul className="hidden md:flex gap-6">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-primary transition-colors font-medium">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="md:hidden">
            <motion.button
              ref={menuBtnRef}
              aria-label="Open menu"
              className="relative overflow-hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={e => {
                const rect = menuBtnRef.current?.getBoundingClientRect();
                if (rect) {
                  setRipple({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                  });
                  setTimeout(() => setRipple(null), 400);
                }
                setMenuOpen(true);
              }}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <FiMenu size={28} />
              {ripple && (
                <span
                  className="pointer-events-none absolute rounded-full bg-primary/30 animate-ripple"
                  style={{
                    left: ripple.x - 40,
                    top: ripple.y - 40,
                    width: 80,
                    height: 80,
                  }}
                />
              )}
            </motion.button>
          </div>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 shadow-2xl"
              style={{ minHeight: '100dvh', minWidth: '100vw', background: '#0a0a14' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            >
              <motion.div
                className="flex flex-col items-center gap-12"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                onClick={e => e.stopPropagation()}
              >
                <motion.div
                  className="mb-2 text-3xl font-bold text-primary tracking-wide"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  Dimas Luis Aditya
                </motion.div>
                <ul className="flex flex-col gap-8 text-lg md:text-xl font-semibold text-center">
                  {nav.map((n, i) => (
                    <motion.li
                      key={n.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                    >
                      <a
                        href={n.href}
                        className="group relative hover:text-primary transition-colors px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        onClick={() => setMenuOpen(false)}
                      >
                        {n.label}
                        <span
                          className="absolute left-1/2 -bottom-1 w-0 group-hover:w-2/3 h-0.5 bg-primary rounded transition-all duration-300 -translate-x-1/2"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <SocialIcons />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <main>
        <Hero />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          <About />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } },
          }}
        >
          <TechStack />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } },
          }}
        >
          <Portfolio />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } },
          }}
        >
          <Experience />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4 } },
          }}
        >
          <Contact />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5 } },
          }}
        >
          <AskMeAnything />
        </motion.div>
      </main>
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Dimas Luis Aditya. All rights reserved.
      </footer>
    </div>
  );
}
export default App;
