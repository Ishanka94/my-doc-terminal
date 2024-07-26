
export const fetchTotalUserCount = async () => {
  const response = await fetch(`${window.Configs.backendUrl}/auth/get-total-user-count`);
  return response.json();
};

export const authenticateUser = async (body) => {
  const response = await fetch(`${window.Configs.backendUrl}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
       'Content-type': 'application/json',
    }
  });
  return response.json();
}
