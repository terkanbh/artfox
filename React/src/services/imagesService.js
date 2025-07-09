const baseUrl = 'http://localhost:5000/api/images';

export const updateImages = async (artworkId, images) => {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  images.forEach((image, index) => {
    formData.append(`Images[${index}].Id`, image.id || null);
    formData.append(`Images[${index}].ImageFile`, image.imageData || null);
    formData.append(`Images[${index}].DisplayOrder`, image.displayOrder);
  });

  const res = await fetch(baseUrl + `/${artworkId}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Authorization': `Bearer ${token}`, },
    body: formData
  });

  if (res.ok) return await res.json();

  throw new Error('Updating artwork images failed');
}