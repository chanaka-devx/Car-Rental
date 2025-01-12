const axios = require('axios');

let accessToken = 'initial-access-token';
const refreshToken = 'your-refresh-token';

const refreshAccessToken = async () => {
  try {
    const response = await axios.post('https://api.example.com/oauth2/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: 'your-client-id',
      client_secret: 'your-client-secret',
    });

    accessToken = response.data.access_token; // Save the new token
    return accessToken;
  } catch (err) {
    console.error('Failed to refresh token:', err);
    throw err;
  }
};

// API Call with Token Refresh
const makeApiCall = async () => {
  try {
    const response = await axios.get('https://api.example.com/endpoint', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    if (err.response?.data?.error?.['.tag'] === 'expired_access_token') {
      console.log('Token expired, refreshing...');
      const newAccessToken = await refreshAccessToken();
      return makeApiCall(); // Retry API call with the new token
    }
    throw err;
  }
};
