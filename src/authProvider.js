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

  getIdentity: async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return Promise.reject();

    console.log("Authorization Header:", `Bearer ${accessToken}`);

    try {
        const userInfoUrl = "http://localhost:8080/users/me";
        const { json } = await fetchUtils.fetchJson(userInfoUrl, {
            method: "GET",
            headers: new Headers({ Authorization: `Bearer ${accessToken.trim()}` })
        });

        return Promise.resolve({ 
            id: json.id, 
            username: json.username, 
            email: json.email, 
            role: json.role
        });
    } catch (error) {
        console.error("Erreur lors de la récupération de l'identité:", error);
        return Promise.reject();
    }
},
};

export default authProvider;