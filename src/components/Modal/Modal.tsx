'use client'

import { useEffect, ReactNode } from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
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
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}