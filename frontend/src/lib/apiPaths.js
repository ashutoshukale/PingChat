export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const API_PATHS = {
  AUTH: {
    SIGN_UP: "/api/auth/signup",
    LOGIN: "/api/auth/login",
    ONBOARD: "/api/auth/onboard",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },
  USER: {
    RECOMMENDED_USERS: "/api/users/",
    USER_FRIENDS: "/api/users/friends",
    SEND_FRIEND_REQUEST: (id) => `/api/users/friend-request/${id}`,
    ACCEPT_FRIEND_REQUEST: (id) => `/api/users/friend-request/${id}/accept`,
    FRIEND_REQUESTS: "/api/users/friend-requests",
    OUTGOING_FRIEND_REQUESTS: "/api/users/outgoing-friend-requests",
  },
};
