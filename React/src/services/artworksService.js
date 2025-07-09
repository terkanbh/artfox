const baseUrl = 'http://localhost:5000/api/artworks';

export const createArtwork = async (data) => {
  const token = localStorage.getItem('token');
  const res = await fetch(baseUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (res.ok) return await res.json();
  throw new Error('Create artwork failed');
}

export const deleteArtwork = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Authorization': `Bearer ${token}`, },
  });
  if (res.ok) return await res.json();
  throw new Error('Delete artwork failed');
}

export const getArtwork = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, {credentials: 'include'});
  if (res.ok) return await res.json();
  throw new Error('Fetch arwork failed');
}

export const getArtworks = async () => {
  const res = await fetch(baseUrl, {credentials: 'include'});
  if (res.ok) return await res.json();
  throw new Error('Fetch arworks failed');
}

export const getRandomArtworks = async (count) => {
  const res = await fetch(`${baseUrl}/random/${count}`, {credentials: 'include'});
  if (res.ok) return await res.json();
  throw new Error('Fetch random arworks failed');
}

export const updateArtwork = async (data) => {
  const token = localStorage.getItem('token');
  const res = await fetch(baseUrl, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (res.ok) return await res.json();
  throw new Error('Update artwork failed');
}