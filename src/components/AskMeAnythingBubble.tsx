import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';

function AskMeAnythingBubble() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Q&A chat history: { q: string, a: string | null }
  const [chat, setChat] = useState<{ q: string; a: string | null }[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Add question to chat with null answer (loading)
    setChat(prev => [...prev, { q: question, a: null }]);
    const currentIdx = chat.length;
    setQuestion("");
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
      setChat(prev => prev.map((item, i) => i === currentIdx ? { ...item, a: data.answer || "[No answer]" } : item));
    } catch (err: unknown) {
      setChat(prev => prev.map((item, i) => i === currentIdx ? { ...item, a: "[Error: " + (err instanceof Error ? err.message : "Unknown error") + "]" } : item));
      setError(err instanceof Error ? err.message : "An error occurred");
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
              <div className="flex flex-col gap-2 mb-4 max-h-72 overflow-y-auto pr-1">
                {chat.length === 0 && (
                  <div className="text-gray-400 text-sm text-center">No questions yet. Start the conversation!</div>
                )}
                {chat.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="self-end bg-primary text-white rounded-lg px-4 py-2 max-w-[80%] text-right text-sm shadow">
                      {item.q}
                    </div>
                    <div className="self-start bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 max-w-[80%] text-left text-sm border border-primary/20 shadow">
                      {item.a === null ? <span className="italic text-gray-400">Gemini is typing...</span> : item.a}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
                <div className="mt-2 text-red-600 dark:text-red-400 text-sm">{error}</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AskMeAnythingBubble;
