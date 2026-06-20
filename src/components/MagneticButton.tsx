import { useRef, type ReactNode, type MouseEvent } from 'react';
import clsx from 'clsx';
import { gsap } from '../lib/gsap';
import { useIsTouch } from '../lib/hooks';
import { useReducedMotion } from '../lib/useReducedMotion';

type Variant = 'primary' | 'ghost' | 'pill' | 'bare';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  strength?: number;
  ariaLabel?: string;
  download?: boolean | string;
  target?: string;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-accent-gradient text-white font-semibold shadow-glow px-7 py-3.5 rounded-full',
  ghost:
    'glass text-mist-100 font-medium px-7 py-3.5 rounded-full hover:border-amber-400/60',
  pill: 'glass text-mist-100 font-medium px-5 py-2.5 rounded-full text-sm',
  bare: '',
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  strength = 0.4,
  ariaLabel,
  download,
  target,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const magnetic = !isTouch && !reduced;

  const onMove = (e: MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(ref.current, { x, y, duration: 0.6, ease: 'power3.out' });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
  };

  const cls = clsx(
    'relative inline-flex items-center justify-center gap-2 select-none transition-colors duration-300 will-transform',
    'focus-visible:outline-amber-500',
    VARIANTS[variant],
    className,
  );

  const shared = {
    ref: ref as never,
    className: cls,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'data-cursor': 'grow',
    'aria-label': ariaLabel,
  };

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel');
    return (
      <a
        {...shared}
        href={href}
        download={download}
        target={target ?? (external ? '_blank' : undefined)}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button {...shared} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
