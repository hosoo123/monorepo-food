export type AuthUser = {
  _id: string;
  email: string;
  role?: string;
  phoneNumber?: string;
  address?: string;
  name?: string;
};

export function saveAuth(token: string, user: AuthUser) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function isAdmin() {
  const user = getStoredUser();
  return Boolean(getToken() && user?.role === "ADMIN");
}
