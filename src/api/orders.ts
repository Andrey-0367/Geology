import { API } from './apiConfig';

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
}

export interface OrderCreateData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  company?: string;
  country: string;
  zip_code: string;
  region: string;
  city: string;
  address: string;
  delivery_method: string;
  agreed_to_terms: boolean;
  comment?: string;
  total: number;
  products: OrderItem[];
}

export const createOrder = async (orderData: OrderCreateData) => {
  console.log("Order URL:", API.orders.create);
  console.log("Order data:", orderData);
  try {
    const response = await fetch(API.orders.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      throw new Error(
        errorData.detail || 
        errorData.message || 
        'Failed to create order'
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};