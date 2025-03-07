import roles from "./roles";

export const hasPermission = (user, action) => {
  if (!user || !user.role) return false;
  return roles[user.role]?.includes(action) || false;
};