"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useRef } from 'react';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartStep: 'cart' | 'checkout';
  setCartStep: (step: 'cart' | 'checkout') => void;
  clearCart: () => void;
  clearInvalidCart?: () => void;
  isSyncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const fetchCartFromServer = async (token: string): Promise<CartItem[]> => {
  const response = await fetch('https://api.geologiya-ru.ru/api/v1/cart/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  
  const data = await response.json();
  return data.items || [];
};

const syncCartWithServer = async (items: CartItem[], token: string): Promise<void> => {
  const response = await fetch('https://api.geologiya-ru.ru/api/v1/cart/', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items })
  });
  
  if (!response.ok) {
    throw new Error('Failed to sync cart');
  }
};

const clearServerCart = async (token: string): Promise<void> => {
  await syncCartWithServer([], token);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isNewSession, setIsNewSession] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartStep, setCartStep] = useState<'cart' | 'checkout'>('cart');
  const [isSyncing, setIsSyncing] = useState(false);
  const initialLoadRef = useRef(true);
  const authTokenRef = useRef<string | null>(null);
  const isBrowser = typeof window !== 'undefined'; 

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Определение новой сессии при загрузке
  useEffect(() => {
    if (!isBrowser) return;
    
    const sessionFlag = sessionStorage.getItem('sessionActive');
    if (sessionFlag === null) {
      // Новая сессия
      sessionStorage.setItem('sessionActive', 'true');
      setIsNewSession(true);
    } else {
      setIsNewSession(false);
    }
  }, [isBrowser]);

  // Очистка корзины при новой сессии
  useEffect(() => {
    if (isNewSession && isBrowser) {
      setCartItems([]);
      sessionStorage.removeItem('cart');
    }
  }, [isNewSession, isBrowser]);

  // Работа с аутентификацией
  useEffect(() => {
    if (!isBrowser) return;
    
    const token = localStorage.getItem('authToken');
    authTokenRef.current = token;
    
    const handleAuthChange = () => {
      const newToken = localStorage.getItem('authToken');
      
      if (!authTokenRef.current && newToken) {
        authTokenRef.current = newToken;
        syncCart();
      } 
      else if (authTokenRef.current && !newToken) {
        authTokenRef.current = null;
      }
    };
    
    window.addEventListener('storage', handleAuthChange);
    return () => window.removeEventListener('storage', handleAuthChange);
  }, [isBrowser]);

  // Загрузка корзины при старте
  useEffect(() => {
    if (!isBrowser) return;
    
    const loadCart = async () => {
      // В новую сессию пропускаем загрузку
      if (isNewSession) {
        initialLoadRef.current = false;
        return;
      }

      const token = authTokenRef.current;
      const savedCart = sessionStorage.getItem('cart'); 
      const isCleared = sessionStorage.getItem('cart_cleared') === 'true';
      
      if (isCleared) {
        sessionStorage.removeItem('cart_cleared');
        sessionStorage.removeItem('cart');
        initialLoadRef.current = false;
        return;
      }
      
      try {
        if (token) {
          const serverCart = await fetchCartFromServer(token);
          setCartItems(serverCart);
          if (serverCart.length > 0) {
            sessionStorage.setItem('cart', JSON.stringify(serverCart));
          }
        } else if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Cart initialization error:', error);
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            setCartItems(parsedCart);
          } catch {
            sessionStorage.removeItem('cart');
          }
        }
      } finally {
        initialLoadRef.current = false;
      }
    };
    
    loadCart();
  }, [isBrowser, isNewSession]);

  const syncCart = async () => {
    // В новую сессию не синхронизируем
    if (isNewSession || !isBrowser) return;
    
    const token = authTokenRef.current;
    if (!token || initialLoadRef.current) return;
    
    setIsSyncing(true);
    try {
      await syncCartWithServer(cartItems, token);
    } catch (error) {
      console.error('Cart sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (initialLoadRef.current || !isBrowser || isNewSession) return;
    
    if (cartItems.length > 0) {
      sessionStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      sessionStorage.removeItem('cart');
    }
    
    syncCart();
  }, [cartItems, isBrowser, isNewSession]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const fixedItem = {
        ...item,
        id: typeof item.id === 'number' ? item.id : String(item.id),
        price: Number(item.price),
        quantity: Number(item.quantity),
      };
      
      const existingItem = prevItems.find((i) => i.id === fixedItem.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === fixedItem.id 
            ? { ...i, quantity: i.quantity + fixedItem.quantity } 
            : i
        );
      } else {
        return [...prevItems, fixedItem];
      }
    });
  };

  const removeFromCart = (id: string | number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    const fixedQuantity = Number(quantity);
    
    if (fixedQuantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => 
        item.id === id ? { ...item, quantity: fixedQuantity } : item
      )
    );
  };

  const clearCart = async () => {
    const token = authTokenRef.current;
    setCartItems([]);
    
    if (isBrowser) {
      sessionStorage.setItem('cart_cleared', 'true');
      sessionStorage.removeItem('cart');
    }
    
    if (token && !isNewSession) {
      try {
        await clearServerCart(token);
      } catch (error) {
        console.error('Failed to clear server cart:', error);
      }
    }
  };

  const clearInvalidCart = () => {
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        clearInvalidCart,
        totalItems,
        isCartOpen,
        setIsCartOpen,
        cartStep,
        setCartStep,
        isSyncing
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};