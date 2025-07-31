export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(`API error (${res.status}): ${message}`);
  }
  return await res.json();
};

export const apiGet = async <T>(url: string): Promise<T> => {
  const res = await fetch(`${API_URL}${url}`, {
    cache: "no-store",
  });
  return handleResponse<T>(res);
};

export const apiPost = async <T>(url: string, body: unknown): Promise<T> => {
  const res = await fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
};

export const apiDelete = async <T>(url: string): Promise<T> => {
  const res = await fetch(`${API_URL}${url}`, {
    method: "DELETE",
  });
  return handleResponse<T>(res);
};
