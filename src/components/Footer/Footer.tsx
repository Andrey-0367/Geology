"use client";

import { useState } from "react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке сообщения");
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsModalOpen(false);
        setFormData({ email: "", message: "" });
      }, 2000);
    } catch (err) {
      setError((err as Error).message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.contactButton}
        >
          Написать нам
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <h2 className={styles.title}>Отправить сообщение</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="email"
                placeholder="Ваш email"
                className={styles.input}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Сообщение"
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
                {loading ? "Отправка..." : "Отправить"}
              </button>
              {error && <div className={styles.error}>{error}</div>}
              {success && (
                <div className={styles.success}>Сообщение отправлено!</div>
              )}
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