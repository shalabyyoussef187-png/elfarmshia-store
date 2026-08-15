export const API_BASE = "https://elfarmshia-backend.vercel.app";

const STORAGE_TOKEN = "pharma_auth_token";
const STORAGE_USER = "pharma_auth_user";

export function persistAuth(payload) {
  localStorage.setItem(STORAGE_TOKEN, payload.token);
  localStorage.setItem(STORAGE_USER, JSON.stringify(payload.user));
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_USER);
}

export function getStoredToken() {
  return localStorage.getItem(STORAGE_TOKEN);
}

export function getStoredUser() {
  const userJson = localStorage.getItem(STORAGE_USER);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

async function parseJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

function authErrorMessage(res, json) {
  const raw = json.message?.trim();
  if (raw) {
    if (/already registered/i.test(raw)) {
      return "هذا البريد الإلكتروني مسجّل مسبقاً. سجّل الدخول أو استخدم بريداً آخر.";
    }
    return raw;
  }
  if (res.status === 409) {
    return "هذا البريد الإلكتروني مسجّل مسبقاً. سجّل الدخول أو استخدم بريداً آخر.";
  }
  return `فشل الطلب (${res.status})`;
}

function assertAuthPayload(res, json) {
  if (!res.ok || !json.success || !json.data) {
    throw new Error(authErrorMessage(res, json));
  }
  return json.data;
}

export async function login(body) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await parseJson(res);
  return assertAuthPayload(res, json);
}

export async function register(body) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await parseJson(res);
  return assertAuthPayload(res, json);
}
