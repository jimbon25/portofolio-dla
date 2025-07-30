import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const socials = [
  {
    href: 'https://github.com/',
    label: 'GitHub',
    icon: <FaGithub />,
  },
  {
    href: 'https://linkedin.com/',
    label: 'LinkedIn',
    icon: <FaLinkedin />,
  },
  {
    href: 'https://instagram.com/',
    label: 'Instagram',
    icon: <FaInstagram />,
  },
];

export default function SocialIcons() {
  return (
    <div className="flex gap-4 text-2xl">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="hover:text-primary transition-colors"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
