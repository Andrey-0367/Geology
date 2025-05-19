'use client';

import { JSX, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import style from './BackButton.module.scss';
import Image, { StaticImageData } from 'next/image';

interface BackButtonProps {
  className?: string;
  iconSrc?: StaticImageData | string;
  iconAlt?: string;
  iconWidth?: number;
  iconHeight?: number;
}

export default function BackButton({
  className = '',
  iconSrc = '/Geology/icons/arrow_back.svg',
  iconAlt = 'Назад',
  iconWidth = 28,
  iconHeight = 28,
}: BackButtonProps): JSX.Element {
  const router = useRouter();

  const handleBack = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    router.back();
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label={iconAlt}
      className={`${style.backButton} ${className}`}>
      <Image src={iconSrc} alt={iconAlt} width={iconWidth} height={iconHeight} />
    </button>
  );
}
