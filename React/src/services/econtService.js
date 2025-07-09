const baseUrl = 'http://localhost:5000/api/econt';

export const getOffices = async () => {
  const res = await fetch(`${baseUrl}/offices`, {credentials: 'include'});
  if (res.ok) return await res.json();
  throw new Error('Fetch econt offices failed');
}