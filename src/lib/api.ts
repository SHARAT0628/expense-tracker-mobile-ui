const API_URL = 'https://expenses-tracker-v19g.onrender.com/api';

export const api = {
  getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  async login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async register(username, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  async getDashboard(userId, fileId, year, month) {
    const res = await fetch(`${API_URL}/dashboard?user_id=${userId}&file_id=${fileId}&year=${year}&month=${month}`);
    if (!res.ok) throw new Error('Failed to fetch dashboard');
    return res.json();
  },

  async getFiles(userId) {
    const res = await fetch(`${API_URL}/files?user_id=${userId}`);
    if (!res.ok) throw new Error('Failed to fetch files');
    return res.json();
  },
  
  async getExpenses(userId, fileId) {
    const res = await fetch(`${API_URL}/expenses?user_id=${userId}&file_id=${fileId}`);
    if (!res.ok) throw new Error('Failed to fetch expenses');
    return res.json();
  },

  async addExpense(data) {
    const res = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to add expense');
    return res.json();
  }
};
