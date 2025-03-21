import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:8080";
const refreshTokenUrl = `${apiUrl}/auth/refresh`;

const authProvider = {
  login: ({ email, password }) => {
    return fetchUtils.fetchJson(`${apiUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then(({ json }) => {
      localStorage.setItem("accessToken", json.accessToken);
      localStorage.setItem("refreshToken", json.refreshToken);
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return Promise.resolve();
  },

  checkError: async (error) => {
    const status = error.status;
    if (status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { json } = await fetchUtils.fetchJson(refreshTokenUrl, {
            method: "POST",
            body: JSON.stringify({ refreshToken }),
          });

          localStorage.setItem("accessToken", json.accessToken);
          return Promise.resolve();
        } catch (error) {
          return Promise.reject();
        }
      }
      return Promise.reject();
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("accessToken") ? Promise.resolve() : Promise.reject();
  },

  getPermissions: () => Promise.resolve(),
};

export default authProvider;
