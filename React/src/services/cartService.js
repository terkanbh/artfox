const baseUrl = 'http://localhost:5000/api/carts';

export const addCartItem = async (data) => {
  const res = await fetch(baseUrl + '/addItem', {
    method: 'PUT',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (res.ok) return await res.json();
  throw new Error('Failed to add cart item.');
}

export const deleteCartItem = async (itemId) => {
  const res = await fetch(`${baseUrl}/deleteItem/${itemId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (res.ok) return await res.json();
  throw new Error('Failed to delete cart item.');
}

export const getCartItems = async () => {
  const res = await fetch(baseUrl, { credentials: 'include' });
  if (res.ok) return await res.json();
  throw new Error('Failed to fetch cart items.');
}

export const updateCartItem = async (data) => {
  const res = await fetch(baseUrl + '/updateItem', {
    method: 'PUT',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (res.ok) return await res.json();
  throw new Error('Failed to update cart item.')
}