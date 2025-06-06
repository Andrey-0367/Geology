'use client'

import { useEffect } from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Закрыть модальное окно"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}