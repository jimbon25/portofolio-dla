
# Modern Portfolio Website (2025)

This is a modern, responsive portfolio website built with:

- **React + Vite + TypeScript**
- **Tailwind CSS**
- **Framer Motion** (for smooth animations)
- **AOS** (Animate On Scroll, optional)

## Features

- Landing (Hero), About, Tech Stack, Portfolio, Experience, Contact sections
- Dark/Light mode toggle
- Smooth, modern animations
- Responsive mobile-first design
- Clickable social media icons (GitHub, LinkedIn, Instagram)
- Portfolio section with 4 project cards (image, name, description, View Demo & GitHub buttons)
- Clean, minimal, and consistent UI
- Deploy-ready for Vercel/Netlify
- No authentication features
- Placeholder for Gemini API integration (Ask Me Anything section)

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

Ready for deployment to Vercel or Netlify. Edit `vite.config.ts` if you need custom base paths.

---

Replace all placeholder images and text with your own content for production use.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
