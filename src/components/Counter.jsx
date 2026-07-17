import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

export default function Counter({ to, prefix = '', suffix = '', duration = 2.2, className, useGrouping = true }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate(val) {
        if (el) el.textContent = prefix + Math.round(val).toLocaleString(undefined, { useGrouping }) + suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, to, prefix, suffix, duration, useGrouping]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
