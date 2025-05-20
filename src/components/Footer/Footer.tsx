"use client";

import { useState, useRef } from "react";
import Modal from "@/components/Modal/Modal";
import styles from "./Footer.module.scss";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Добавляем парсинг ответа

      if (!response.ok) {
        throw new Error(data.error || "Ошибка сервера");
      }

      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setFormData({ email: "", message: "" });
        setSuccess(false);
      }, 2000);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Детали ошибки:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.contactButton}
          aria-label="Открыть форму обратной связи"
        >
          Написать нам
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalForm}>
            <h2 className={styles.modalTitle}>Обратная связь</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="email"
                placeholder="Ваш Email"
                className={styles.input}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Ваше сообщение"
                className={styles.textarea}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={5}
              />
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? "Отправка..." : "Отправить сообщение"}
              </button>
              {error && <p className={styles.error}>{error}</p>}
              {success && <p className={styles.success}>Успешно отправлено!</p>}
            </form>
          </div>
        </Modal>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Geology. Все права защищены
        </p>
      </div>
    </footer>
  );
}
