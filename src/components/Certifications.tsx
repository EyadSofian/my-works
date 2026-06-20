import { motion } from 'framer-motion';
import { certs } from '../data/profile';
import { useLang } from '../lib/i18n';

export function Certifications() {
  const { t } = useLang();
  return (
    <section id="certifications" className="relative py-16">
      <div className="container-x">
        <div className="eyebrow mb-6 text-center text-haze-300">{t.certifications}</div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {certs.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              className="glass flex flex-col items-center gap-1 rounded-2xl px-4 py-6 text-center"
            >
              <span className="font-display text-base font-semibold text-amber-400">{c.issuer}</span>
              <span className="text-sm text-haze-300">{c.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
