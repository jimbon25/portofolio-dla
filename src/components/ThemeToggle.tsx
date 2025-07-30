import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      aria-label="Toggle dark mode"
      className="p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
