"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./CheckoutForm.module.scss";
import { CartItem } from "@/contexts/CartContext";
import { createOrder, OrderCreateData } from "@/api/orders";
import { useCart } from "@/contexts/CartContext";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  zipCode: string;
  region: string;
  city: string;
  address: string;
  delivery: string;
  agree: boolean;
  comment: string;
};

interface CheckoutFormProps {
  onBack?: () => void;
  onSuccess: () => void;
  items: CartItem[];
  isQuickOrder?: boolean;
}

export default function CheckoutForm({
  onBack,
  onSuccess,
  items = [],
  isQuickOrder = false,
}: CheckoutFormProps) {
  const { clearCart, isSyncing } = useCart();
  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    country: "Российская Федерация",
    zipCode: "",
    region: "",
    city: "",
    address: "",
    delivery: "courier",
    agree: false,
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [syncError, setSyncError] = useState(false);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Проверка синхронизации корзины
  useEffect(() => {
    if (isSyncing) {
      setSyncError(false);
    } else if (items.length > 0 && !isSyncing) {
      const hasInvalidItems = items.some(
        (item) =>
          isNaN(Number(item.id)) || isNaN(item.quantity) || isNaN(item.price)
      );

      if (hasInvalidItems) {
        setSyncError(true);
        console.error("Обнаружены несинхронизированные товары");
      }
    }
  }, [isSyncing, items]);

  // Функция для форматирования телефона
  const formatPhoneNumber = useCallback((value: string): string => {
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, '');
    // Ограничиваем длину до 11 символов
    const limited = cleaned.slice(0, 11);
    
    // Форматируем номер по шаблону
    let formatted = '';
    if (limited.length > 0) {
      formatted += '+7 ';
      if (limited.length > 1) {
        formatted += `(${limited.slice(1, 4)}`;
        if (limited.length > 4) {
          formatted += `) ${limited.slice(4, 7)}`;
          if (limited.length > 7) {
            formatted += `-${limited.slice(7, 9)}`;
            if (limited.length > 9) {
              formatted += `-${limited.slice(9, 11)}`;
            }
          }
        }
      }
    }
    
    return formatted;
  }, []);

  // Обработчик изменения телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  // Обработчик изменения почтового индекса
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Разрешаем только цифры
    const value = e.target.value.replace(/\D/g, '');
    // Ограничиваем 6 символами
    const limited = value.slice(0, 6);
    setFormData({ ...formData, zipCode: limited });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация телефона и индекса
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      setError("Введите полный номер телефона (11 цифр)");
      return;
    }
    
    if (formData.zipCode.length !== 6) {
      setError("Почтовый индекс должен состоять из 6 цифр");
      return;
    }

    if (syncError) {
      setError(
        "Корзина не синхронизирована с сервером. Пожалуйста, обновите страницу"
      );
      return;
    }

    if (!formData.agree) {
      setError("Необходимо согласиться с обработкой персональных данных");
      return;
    }

    const invalidItems = items.filter((item) => {
      const id = Number(item.id);
      return (
        isNaN(id) ||
        isNaN(item.quantity) ||
        isNaN(item.price) ||
        item.quantity <= 0 ||
        item.price <= 0
      );
    });

    if (invalidItems.length > 0) {
      console.error("Обнаружены невалидные товары:", invalidItems);
      setError(
        "Обнаружены невалидные товары в корзине. Пожалуйста, обновите страницу"
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const orderData: OrderCreateData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        country: formData.country,
        zip_code: formData.zipCode,
        region: formData.region,
        city: formData.city,
        address: formData.address,
        delivery_method: formData.delivery,
        agreed_to_terms: formData.agree,
        comment: formData.comment,
        products: items.map((item) => ({
          id: Number(item.id),
          quantity: item.quantity,
          price: item.price,
        })),
        total: totalPrice,
      };

      const order = await createOrder(orderData);
      clearCart();
      setIsOrderPlaced(true);
      onSuccess();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Неизвестная ошибка";

      if (
        errorMessage.includes("500") ||
        errorMessage.includes("Internal Server Error")
      ) {
        setError("Ошибка на сервере. Пожалуйста, попробуйте позже");
      } else if (errorMessage.includes("Ошибки в товарах")) {
        setError(
          "Проблема с товарами в заказе: " +
            errorMessage.replace("Ошибки в товарах: ", "")
        );
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isOrderPlaced) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="green"
            width="64px"
            height="64px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
          <h2>Заказ оформлен!</h2>
          <p>
            Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для
            уточнения деталей.
          </p>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className={styles.continueButton}
            >
              Продолжить покупки
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutWrapper}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className={styles.backButton}
          disabled={isSubmitting}
        >
          &larr; Назад {isQuickOrder ? "в магазин" : "в корзину"}
        </button>
      )}

      <h2>Оформление заказа</h2>

      {isQuickOrder && (
        <div className={styles.quickOrderNotice}>
          <p>Вы оформляете быстрый заказ без добавления в корзину</p>
        </div>
      )}

      {isSyncing && (
        <div className={styles.syncingNotice}>
          <p>Синхронизация корзины с сервером...</p>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      <div className={styles.orderSummary}>
        <h3>Состав заказа:</h3>
        <ul className={styles.orderItems}>
          {items.map((item) => (
            <li key={item.id} className={styles.orderItem}>
              <div className={styles.itemImage}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} />
                ) : (
                  <div className={styles.imagePlaceholder}>Нет фото</div>
                )}
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.itemName}>{item.name}</div>
                <div className={styles.itemInfo}>
                  <span>
                    {item.quantity} шт × {item.price.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.orderTotal}>
          Итого: <strong>{totalPrice.toLocaleString("ru-RU")} ₽</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <h3>Контактные данные</h3>
        <div className={styles.formGrid}>
          <input
            placeholder="Имя"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
            disabled={isSubmitting || isSyncing}
          />
          <input
            placeholder="Фамилия"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
            disabled={isSubmitting || isSyncing}
          />
          <input
            type="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            disabled={isSubmitting || isSyncing}
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handlePhoneChange}
            required
            disabled={isSubmitting || isSyncing}
          />
        </div>

        <h3>Адрес доставки</h3>
        <div className={styles.formGrid}>
          <input
            placeholder="Компания"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            disabled={isSubmitting || isSyncing}
          />
          <select
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            required
            disabled={isSubmitting || isSyncing}
          >
            <option value="Российская Федерация">Российская Федерация</option>
            <option value="Казахстан">Казахстан</option>
            <option value="Беларусь">Беларусь</option>
          </select>
          <input
            placeholder="Индекс"
            value={formData.zipCode}
            onChange={handleZipChange}
            required
            disabled={isSubmitting || isSyncing}
            maxLength={6}
            pattern="\d{6}"
            title="Почтовый индекс должен состоять из 6 цифр"
          />
          <input
            placeholder="Регион / Область"
            value={formData.region}
            onChange={(e) =>
              setFormData({ ...formData, region: e.target.value })
            }
            required
            disabled={isSubmitting || isSyncing}
          />
          <input
            placeholder="Город"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            disabled={isSubmitting || isSyncing}
          />
          <input
            placeholder="Адрес"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
            disabled={isSubmitting || isSyncing}
          />
        </div>

        <div className={styles.commentField}>
          <label>Комментарий к заказу:</label>
          <textarea
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            disabled={isSubmitting || isSyncing}
            placeholder="Ваши пожелания или примечания к заказу"
          />
        </div>

        <div className={styles.delivery}>
          <label>Способ доставки:</label>
          <select
            value={formData.delivery}
            onChange={(e) =>
              setFormData({ ...formData, delivery: e.target.value })
            }
            required
            disabled={isSubmitting || isSyncing}
          >
            <option value="courier">Курьер</option>
            <option value="pickup">Самовывоз</option>
            <option value="post">Почта России</option>
          </select>
        </div>

        <div className={styles.agree}>
          <input
            type="checkbox"
            id="agree"
            checked={formData.agree}
            onChange={(e) =>
              setFormData({ ...formData, agree: e.target.checked })
            }
            required
            disabled={isSubmitting || isSyncing}
          />
          <label htmlFor="agree">
            Ставя отметку, вы даёте согласие на обработку персональных данных
          </label>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={
            isSubmitting ||
            !formData.agree ||
            isSyncing ||
            syncError
          }
        >
          {isSubmitting ? "Оформление..." : "Подтвердить заказ"}
        </button>
      </form>
    </div>
  );
}