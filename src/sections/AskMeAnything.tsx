import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AskMeAnything() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const res = await fetch("/api/ask-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error("Gagal memproses pertanyaan");
      const data = await res.json();
      setAnswer(data.answer || "[No answer]");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Terjadi error");
      } else {
        setError("Terjadi error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="ama" className="py-20 px-4 max-w-2xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-4 text-primary"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Ask Me Anything (Gemini API)
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300 mb-8"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Ask anything, Gemini AI will answer your question below.
      </motion.p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tulis pertanyaan..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-primary text-white font-semibold px-6 py-2 rounded hover:bg-primary/90 transition disabled:opacity-60"
          disabled={loading || !question.trim()}
        >
          {loading ? "Memproses..." : "Tanya"}
        </button>
      </form>
      {error && (
        <div className="mb-4 text-red-600 dark:text-red-400 text-sm">{error}</div>
      )}
      {answer && (
        <div className="p-6 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-left whitespace-pre-line border border-primary/20">
          {answer}
        </div>
      )}
    </section>
  );
}
