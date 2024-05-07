import { clearUser, getToken } from './auth';

export async function postJson(url: string, jsonObject: object) {
  const token = getToken();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonObject),
  });
  const isExpired = false;
  if (isExpired) {
    clearUser();
  }
  return response;
}

export async function get(url: string) {
  const token = getToken();
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const isExpired = false;
  if (isExpired) {
    clearUser();
  }
  return response;
}

export async function postForm(url: string, form: FormData) {
  const token = getToken();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  const isExpired = false;
  if (isExpired) {
    clearUser();
  }
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
}
