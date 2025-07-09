const baseUrl = 'http://localhost:5000/api/orders';

export const createOrder = async (data) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (res.ok) return await res.json();
  throw new Error('Failed to create order.');
} 

export const getOrders = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(baseUrl, {
    credentials: 'include',
    headers: {'Authorization': `Bearer ${token}`}
  });
  if (res.ok) return await res.json();
  throw new Error('Fetch orders failed');
}