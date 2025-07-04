'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Обработчик клика вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        burgerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Обработчик изменения размера окна
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <Link 
          href="/" 
          className={styles.logoLink}
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/geology/icons/logo.svg"
            alt="geology Logo"
            width={68}
            height={71}
            priority
          />
          <span className={styles.logoText}>МБО</span>
        </Link>

        {/* Бургер-кнопка */}
        <button
          ref={burgerRef}
          className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>

        {/* Основное меню */}
        <div 
          ref={menuRef}
          className={`${styles.mainMenu} ${isMenuOpen ? styles.open : ''}`}
        >
          <Link 
            href="/shop" 
            className={styles.menuLink}
            onClick={toggleMenu}
          >
            Каталог
          </Link>
          <Link 
            href="/about" 
            className={styles.menuLink}
            onClick={toggleMenu}
          >
            О нас
          </Link>
          
        </div>
      </nav>
    </header>
  );
}