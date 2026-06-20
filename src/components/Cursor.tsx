import { useEffect, useRef } from 'react';
import { useIsTouch } from '../lib/hooks';
import { useReducedMotion } from '../lib/useReducedMotion';

/**
 * Custom cursor: a crisp amber dot + a trailing ring that lerps behind it.
 * Grows over elements marked [data-cursor]. Disabled on touch / reduced-motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isTouch || reduced) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.body.classList.add('has-custom-cursor');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...mouse };
    let hovering = false;
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      const el = (e.target as HTMLElement)?.closest?.(
        'a, button, [data-cursor], input, textarea, [role="button"]',
      );
      const next = !!el;
      if (next !== hovering) {
        hovering = next;
        ring.classList.toggle('cursor-ring--hover', hovering);
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isTouch, reduced]);

  if (isTouch || reduced) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-amber-400/70 opacity-0 pointer-events-none"
        style={{ transition: 'opacity .3s, width .25s, height .25s, background-color .25s, border-color .25s' }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-amber-500 opacity-0 pointer-events-none"
        style={{ transition: 'opacity .3s' }}
      />
    </>
  );
}
