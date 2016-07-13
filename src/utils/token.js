const { localStorage } = window;

export const getToken = () => localStorage.getItem('token');

export const storeToken = (token) => localStorage.setItem('token', token);

export const clearToken = () => localStorage.removeItem('token');
