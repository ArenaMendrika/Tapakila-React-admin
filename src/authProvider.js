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
    let accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

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
            role: json.role,
        });

    } catch (error) {
        console.error("Erreur lors de la récupération de l'identité:", error);

        if (error.status === 401 && refreshToken) {
            try {
                const refreshResponse = await fetch("http://localhost:8080/auth/refresh", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ refreshToken })
                });

                if (!refreshResponse.ok) {
                    console.error("Échec du rafraîchissement du token");
                    return Promise.reject();
                }

                const { accessToken: newAccessToken } = await refreshResponse.json();
                localStorage.setItem("accessToken", newAccessToken);

                const { json: refreshedJson } = await fetchUtils.fetchJson("http://localhost:8080/users/me", {
                    method: "GET",
                    headers: new Headers({ Authorization: `Bearer ${newAccessToken.trim()}` })
                });

                return Promise.resolve({
                    id: refreshedJson.id,
                    username: refreshedJson.username,
                    email: refreshedJson.email,
                    role: refreshedJson.role,
                });

            } catch (refreshError) {
                console.error("Erreur lors du rafraîchissement du token:", refreshError);
                return Promise.reject();
            }
        }

        return Promise.reject();
    }
},
};

export default authProvider;