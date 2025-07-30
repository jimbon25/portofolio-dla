import { motion } from 'framer-motion';

const projects = [
  {
    name: 'Project One',
    image: 'https://placehold.co/400x240?text=Project+1',
    description: 'A modern web app with cool features and responsive design.',
    demo: '#',
    github: '#',
  },
  {
    name: 'Project Two',
    image: 'https://placehold.co/400x240?text=Project+2',
    description: 'A creative project showcasing animation and interactivity.',
    demo: '#',
    github: '#',
  },
  {
    name: 'Project Three',
    image: 'https://placehold.co/400x240?text=Project+3',
    description: 'A portfolio site template with dark/light mode and more.',
    demo: '#',
    github: '#',
  },
  {
    name: 'Project Four',
    image: 'https://placehold.co/400x240?text=Project+4',
    description: 'A landing page with smooth animations and clean UI.',
    demo: '#',
    github: '#',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-8 text-primary"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Portfolio
      </motion.h2>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{p.description}</p>
              <div className="flex gap-4 mt-auto">
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">View Demo</a>
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
