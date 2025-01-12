import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003", // Backend base URL
});

// Function to refresh token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/oauth2/token`, {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: "your-client-id",
      client_secret: "your-client-secret",
    });

    const { access_token } = response.data;

    // Update the access token in localStorage
    localStorage.setItem("accessToken", access_token);

    return access_token;
  } catch (err) {
    console.error("Error refreshing access token:", err);
    throw err; // Redirect user to login if refresh fails
  }
};

// Function to make API calls
export const apiCall = async (endpoint, method = "GET", data = null) => {
  let token = localStorage.getItem("accessToken");

  try {
    const response = await api({
      url: endpoint,
      method,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    if (err.response?.data?.error?.[".tag"] === "expired_access_token") {
      // Refresh the token and retry the API call
      token = await refreshAccessToken();

      const retryResponse = await api({
        url: endpoint,
        method,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return retryResponse.data;
    }

    throw err; // Propagate error if it's not a token issue
  }
};
