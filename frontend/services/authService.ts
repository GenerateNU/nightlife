import { API_DOMAIN } from "@env";

export const loginService = async (email: string, password: string) => {

  const res = await fetch(`${API_DOMAIN}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }
  
  return data; 
}

export const fetchUserProfileService = async (email: string, token: string) => {
  email = email.toLowerCase();
  const res = await fetch(`${API_DOMAIN}/profiles/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const userData = await res.json();

  if (userData.error) {
    throw new Error(userData.error);
  }

  return userData;
};
