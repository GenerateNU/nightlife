import { API_DOMAIN } from "@env";

export const loginService = async (email: string, password: string) => {
  try {
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
  } catch (error) {
    throw error;
  }
}

export const fetchUserProfileService = async (email: string, token: string) => {
  email = email.toLowerCase();
  try {
    const res = await fetch(`http://127.0.0.1:8080/profiles/${email}`, {
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
  } catch (error) {
    throw error;
  }
};
