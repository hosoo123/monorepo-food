export const apiUrl = (path: string) => {
  const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
};
