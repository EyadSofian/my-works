import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { contact, hero, type ContactChannel } from '../data/profile';
import { useLang } from '../lib/i18n';

function ChannelIcon({ icon }: { icon: ContactChannel['icon'] }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true } as const;
  switch (icon) {
    case 'mail':
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2 1.3 2.3 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.2.5.3 0 .2 0 .9-.3 1.3Z" />
        </svg>
      );
    case 'github':
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.3-1.1.6-1.4-2.2-.300-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common} fill="currentColor">
          <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21H17v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9V9Z" />
        </svg>
      );
    case 'botpress':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="7" width="16" height="12" rx="3" />
          <path d="M12 7V4M9 12h.01M15 12h.01" strokeLinecap="round" />
        </svg>
      );
  }
}

export function Contact() {
  const { lang, t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden pt-[var(--section-pad)]">
      {/* dissolving amber spark */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2 opacity-40 blur-[90px]"
        style={{ background: 'radial-gradient(50% 100% at 50% 0%, rgba(59,130,246,0.4), transparent 70%)' }}
      />

      <div className="container-x relative">
        <div className="flex flex-col items-center text-center">
          <div className="eyebrow mb-5 text-amber-500">Contact</div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-3xl text-balance font-display text-4xl font-semibold tracking-tightest text-gradient sm:text-6xl ${
              lang === 'ar' ? 'font-arabic' : ''
            }`}
          >
            {lang === 'ar' ? contact.headingAr : contact.heading}
          </motion.h2>
          <p className="mt-5 max-w-lg text-base text-haze-300">{contact.blurb}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton variant="primary" href={`mailto:${contact.email}`}>
              {contact.email}
            </MagneticButton>
            <MagneticButton variant="ghost" href={contact.whatsappHref}>
              WhatsApp · {contact.whatsapp}
            </MagneticButton>
          </div>

          {/* social icons */}
          <div className="mt-10 flex items-center gap-3">
            {contact.channels.map((c) => (
              <MagneticButton
                key={c.id}
                variant="bare"
                href={c.href}
                ariaLabel={c.label}
                strength={0.5}
                className="glass flex h-12 w-12 items-center justify-center rounded-full text-haze-300 transition-colors duration-300 hover:border-amber-400/70 hover:text-amber-500"
              >
                <ChannelIcon icon={c.icon} />
              </MagneticButton>
            ))}
          </div>
        </div>

        <hr className="hairline mt-16" />
        <div className="flex flex-col items-center justify-between gap-3 py-8 text-sm text-haze-300 sm:flex-row">
          <span>
            © {year} {lang === 'ar' ? 'إياد سفيان' : 'Eyad Sofian'} · {t.rights}
          </span>
          <span className="font-mono text-xs">{hero.location}</span>
        </div>
      </div>
    </footer>
  );
}
