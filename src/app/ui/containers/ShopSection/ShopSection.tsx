"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './ShopSection.module.scss';
import { Title } from '@/components/Title/Title';

const DEVELOPING_TEXT = "Страница в разработке";

export default function ShopSection() {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = DEVELOPING_TEXT.split('');

  useEffect(() => {
    let isMounted = true;
    let animationFrame: number;

    const animate = () => {
      if (!isMounted || !containerRef.current) return;
      
      if (visibleLetters < letters.length) {
        animationFrame = requestAnimationFrame(() => {
          setVisibleLetters(prev => prev + 1);
        });
      }
    };

    const interval = setInterval(animate, 3000 / letters.length);

    return () => {
      isMounted = false;
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
    };
  }, [visibleLetters]);

  return (
    <div ref={containerRef} className={styles.container}>
      <Title tag={'h1'}>
        {letters.slice(0, visibleLetters).join('')}
      </Title>
    </div>
  );
}