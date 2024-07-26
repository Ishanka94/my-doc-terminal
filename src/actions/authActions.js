

export const login = (userData) => (dispatch) => {
    // Perform your login logic here (e.g., API call)
    // For simplicity, we'll directly dispatch the success action
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: userData,
    });
};
  
export const logout = () => (dispatch) => {
    dispatch({
        type: 'LOGOUT',
    });
};