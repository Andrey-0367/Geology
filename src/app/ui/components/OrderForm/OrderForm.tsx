import { useState } from 'react'

const OrderForm = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    comment: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const orderPayload = {
      ...formData,
      items: cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    }

    // Отправка данных на сервер
    const response = await fetch('/api/shop/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    })

    // Обработка ответа
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="tel"
        placeholder="Телефон"
        required
        value={formData.phone}
        onChange={e => setFormData({...formData, phone: e.target.value})}
      />
      
      <input
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={e => setFormData({...formData, email: e.target.value})}
      />

      <textarea
        placeholder="Комментарий к заказу"
        value={formData.comment}
        onChange={e => setFormData({...formData, comment: e.target.value})}
      />

      <button type="submit">Подтвердить заказ</button>
    </form>
  )
}