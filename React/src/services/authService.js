const baseUrl = 'http://localhost:5000/api/auth/login';

export const login = async (data) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  if (res.ok) return await res.json();
  throw new Error('Login failed.');
} 