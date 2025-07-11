"use client";

import styles from "./CartModal.module.scss";
import Modal from "../Modal/Modal";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";

export default function CartModal() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    totalItems,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    cartStep,
    setCartStep,
  } = useCart();

  const [isMounted, setIsMounted] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Защита от undefined
  const totalPrice = (cartItems || []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const handleCheckout = () => {
    setCartStep("checkout");
    setOrderConfirmed(false);
  };

  const handleBackToCart = () => {
    setCartStep("cart");
  };

  const handleOrderSuccess = () => {
    clearCart();
    setOrderConfirmed(true);
  };

  const handleCloseModal = () => {
    setIsCartOpen(false);
    setCartStep("cart");
    setOrderConfirmed(false);

    if (orderConfirmed) {
      clearCart();
    }
  };

  const getCheckoutItems = () => cartItems || [];

  return (
    <>
      <button onClick={() => setIsCartOpen(true)} className={styles.cartButton}>
        <CartIcon />
        {isMounted && totalItems > 0 && (
          <span className={styles.badge}>{totalItems}</span>
        )}
      </button>

      <Modal isOpen={isCartOpen} onClose={handleCloseModal}>
        <div className={styles.cartContent}>
          {cartStep === "cart" ? (
            <>
              <h2>Корзина покупок</h2>

              {!cartItems || cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                  <p>Ваша корзина пуста</p>
                  <button
                    className={styles.continueButton}
                    onClick={handleCloseModal}
                  >
                    Продолжить покупки
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.tableWrapper}>
                    <div className={styles.tableContainer}>
                      <table className={styles.cartTable}>
                        <thead>
                          <tr>
                            <th className={styles.imageHeader}>Изображение</th>
                            <th className={styles.nameHeader}>Название</th>
                            <th className={styles.quantityHeader}>Кол-во</th>
                            <th className={styles.priceHeader}>Цена</th>
                            <th className={styles.totalHeader}>Сумма</th>
                            <th className={styles.removeHeader}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr key={item.id} className={styles.cartItem}>
                              <td className={styles.imageCell}>
                                {item.imageUrl ? (
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className={styles.productImage}
                                  />
                                ) : (
                                  <div
                                    className={styles.imagePlaceholder}
                                  ></div>
                                )}
                              </td>
                              <td className={styles.nameCell}>{item.name}</td>
                              <td className={styles.quantityCell}>
                                <div className={styles.quantityControl}>
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.id,
                                        item.quantity - 1
                                      )
                                    }
                                    disabled={item.quantity <= 1}
                                  >
                                    -
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className={styles.priceCell}>
                                {formatPrice(item.price)}
                              </td>
                              <td className={styles.totalCell}>
                                {formatPrice(item.price * item.quantity)}
                              </td>
                              <td className={styles.removeCell}>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className={styles.removeButton}
                                  title="Удалить из корзины"
                                  aria-label="Удалить из корзины"
                                >
                                  ×
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                      <span>Итого:</span>
                      <span className={styles.grandTotal}>
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <button
                      className={styles.continueButton}
                      onClick={handleCloseModal}
                    >
                      Продолжить покупки
                    </button>
                    <button
                      className={styles.checkoutButton}
                      onClick={handleCheckout}
                    >
                      ОФОРМЛЕНИЕ ЗАКАЗА
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className={styles.checkoutWrapper}>
              {orderConfirmed ? (
                <div className={styles.confirmation}>
                  <h2>Заказ оформлен!</h2>
                  <p>Ваш заказ успешно принят в обработку.</p>
                  <button
                    className={styles.continueButton}
                    onClick={handleCloseModal}
                  >
                    Закрыть
                  </button>
                </div>
              ) : (
                <CheckoutForm
                  items={getCheckoutItems()}
                  onBack={handleBackToCart}
                  onSuccess={handleOrderSuccess}
                />
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

// Иконка корзины
const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.6L5.2 14c-.1.3-.2.6-.2 1 0 1.1.9 2 2 2h12v-2H7.4c-.1 0-.2-.1-.2-.2v-.1l.9-1.7h7.5c.7 0 1.4-.4 1.7-1l3.9-7-1.8-1H6.2l-.9-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);