import { useState } from 'react';
import styles from './ContactForm.module.scss';
import { API } from '@/api/apiConfig';


interface ContactFormProps {
  onSuccess?: () => void;
}

const ContactForm = ({ onSuccess }: ContactFormProps) => {
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

    try {
      const response = await fetch(API.contact.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Обработка ошибок валидации Django
        const errors = Object.values(data).flat().join(', ');
        throw new Error(errors || 'Ошибка при отправке сообщения');
      }

      setSuccess(true);
      onSuccess?.();
      setFormData({ email: '', message: '' });
      
      // Автоскрытие сообщения
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Неизвестная ошибка');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Ваш Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Сообщение:</label>
        <textarea
          id="message"
          placeholder="Ваше сообщение"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
          rows={5}
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className={styles.submitButton}
      >
        {loading ? 'Отправка...' : 'Отправить сообщение'}
      </button>

      {error && <div className={styles.error}>⚠️ {error}</div>}
      {success && <div className={styles.success}>✅ Сообщение отправлено!</div>}
    </form>
  );
};

export default ContactForm;