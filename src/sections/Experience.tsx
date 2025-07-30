import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'Tech Company',
    role: 'Frontend Developer',
    period: '2023 - Present',
    description: 'Building modern, scalable web applications with React and TypeScript.'
  },
  {
    company: 'Startup Inc.',
    role: 'UI/UX Designer',
    period: '2021 - 2023',
    description: 'Designed and prototyped user interfaces for mobile and web.'
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-8 text-primary"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>
      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            className="bg-white dark:bg-gray-900 rounded-lg shadow p-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-1">{exp.role} @ {exp.company}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
