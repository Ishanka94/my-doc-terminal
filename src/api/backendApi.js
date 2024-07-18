// const API_BASE_URL = 'http://localhost:5001/api';

export const fetchTotalUserCount = async () => {
  const response = await fetch(`${window.Configs.backendUrl}/auth/get-total-user-count`);
  return response.json();
};
