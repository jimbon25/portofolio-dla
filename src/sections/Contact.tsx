import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const endpoint = import.meta.env.MODE === "production"
      ? "/.netlify/functions/webhook"
      : "/api/webhook";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      const data = await res.json();
      if (data.discord === 'ok' && data.telegram === 'ok') {
        setStatus("Sent to Discord & Telegram!");
      } else if (data.discord === 'ok') {
        setStatus("Sent to Discord!");
      } else if (data.telegram === 'ok') {
        setStatus("Sent to Telegram!");
      } else {
        setStatus("Failed to send to any platform.");
      }
      setName(""); setEmail(""); setMessage("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus(err.message || "An error occurred");
      } else {
        setStatus("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <textarea
          placeholder="Your Message"
          className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
          rows={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-white rounded hover:bg-primary-dark transition-colors disabled:opacity-60"
          disabled={loading || !name.trim() || !email.trim() || !message.trim()}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
      {status && (
        <div className="mt-4 text-center text-sm text-primary font-semibold">{status}</div>
      )}
    </section>
  );
}
