const baseUrl = 'http://localhost:5000/api/contacts';

export const sendQuery = async (contactsForm) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(contactsForm)
  });
  if (res.ok) return await res.json();
  throw new Error('Sending a contacts query failed.');
}