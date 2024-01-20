import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/"
    : "http://localhost:3001/api/v1/";

axios.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers = {
        Authorization: `Bearer ${access_token}`,
      };
      config.withCredentials = true;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.status == 401) {
      console.log("401: Login Sayfasına");
    } else if (error.response.status == 403) {
      console.log("403: Refresh Token");
      const { accessToken } = await fetchRefreshToken();
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        axios(error.config);
      }
    }

    return Promise.reject(error);
  }
);

async function fetchRefreshToken() {
  const res = await fetch(`auth/refresh_token`, {
    method: "GET",
    credentials: "include", // added this part
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await res.json();
  return jsonResponse;
}

export const Get = async (url, onSuccess, onError) => {
  return axios
    .get(url)
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error);
    });
};

export const Post = async (url, body, onSuccess, onError) => {
  return axios
    .post(url, body)
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error);
    });
};
