import { useState } from 'react';
import styles from './ContactForm.module.scss'; 

interface ContactFormProps {
  onSuccess?: () => void;
  customStyles?: {
    form?: string;
    input?: string;
    textarea?: string;
    submitButton?: string;
  };
}

const ContactForm = ({ onSuccess, customStyles }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:8000/api/contact/', { // Замените на ваш домен
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ошибка при отправке сообщения');
      }

      setSuccess(true);
      onSuccess?.(); 
      setFormData({ email: '', message: '' }); // Очистка формы
      setTimeout(() => setSuccess(false), 3000); // Скрыть сообщение об успехе через 3 секунды
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла неизвестная ошибка');
      setTimeout(() => setError(null), 3000); // Скрыть сообщение об ошибке через 3 секунды
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Ваш Email"
          className={styles.input}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>Сообщение:</label>
        <textarea
          id="message"
          placeholder="Ваше сообщение"
          className={styles.textarea}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={5}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? (
          <span className={styles.buttonLoader}>Отправка...</span>
        ) : (
          'Отправить сообщение'
        )}
      </button>

      {error && (
        <div className={styles.errorMessage}>
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className={styles.successMessage}>
          ✅ Сообщение успешно отправлено!
        </div>
      )}
    </form>
  );
};

export default ContactForm; 