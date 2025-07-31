import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';

export default function AskMeAnythingBubble() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");
    const endpoint = import.meta.env.MODE === "production"
      ? "/.netlify/functions/ask-gemini"
      : "/api/ask-gemini";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error("Failed to process question");
      const data = await res.json();
      setAnswer(data.answer || "[No answer]");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Bubble Button */}
      <button
        className="fixed z-50 bottom-6 right-6 bg-primary text-white rounded-full shadow-lg p-4 flex items-center justify-center hover:bg-primary-dark transition-colors focus:outline-none"
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)' }}
        onClick={() => setOpen(true)}
        aria-label="Ask Me Anything"
      >
        <FiMessageCircle size={28} />
      </button>
      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-md mx-auto p-6 relative"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-primary text-xl"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-2 text-primary">Ask Me Anything (Gemini AI)</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Ask anything, Gemini AI will answer your question below.</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
                <input
                  type="text"
                  className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type your question..."
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
                  {loading ? "Processing..." : "Ask"}
                </button>
              </form>
              {error && (
                <div className="mb-2 text-red-600 dark:text-red-400 text-sm">{error}</div>
              )}
              {answer && (
                <div className="p-4 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-left whitespace-pre-line border border-primary/20">
                  {answer}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
