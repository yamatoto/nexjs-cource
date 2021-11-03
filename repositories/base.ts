const COMMON_URL = "/api";

export async function create<T>(
  url: string,
  body: T,
  query?: string
): Promise<T> {
  const path = `${COMMON_URL}/${url}${query ? "/" + query : ""}`;
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error(res);
    const { message } = await res.json();
    throw new Error(message);
  }
  const data = await res.json();
  return data.payload;
}

export async function getList<T>(url: string, query?: string): Promise<T> {
  const path = `${COMMON_URL}/${url}${query ? "/" + query : ""}`;
  const res = await fetch(path);
  if (!res.ok) {
    console.error(res);
    const { message } = await res.json();
    throw new Error(message);
  }
  const data = await res.json();
  return data.payload;
}
