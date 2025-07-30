import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaCss3Alt, FaHtml5, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiVite } from 'react-icons/si';

const tech = [
  { icon: <FaReact />, name: 'React' },
  { icon: <SiTypescript />, name: 'TypeScript' },
  { icon: <SiTailwindcss />, name: 'Tailwind CSS' },
  { icon: <SiVite />, name: 'Vite' },
  { icon: <FaNodeJs />, name: 'Node.js' },
  { icon: <FaHtml5 />, name: 'HTML5' },
  { icon: <FaCss3Alt />, name: 'CSS3' },
  { icon: <FaGitAlt />, name: 'Git' },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-8 text-primary"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Tech Stack
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {tech.map((t) => (
          <motion.div
            key={t.name}
            className="flex flex-col items-center gap-2 text-4xl text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.icon}
            <span className="text-base text-gray-700 dark:text-gray-300">{t.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
