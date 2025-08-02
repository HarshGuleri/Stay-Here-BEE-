// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  PROFILE: (userId) => `${API_BASE_URL}/auth/profile/${userId}`,
  
  // Room endpoints
  ROOMS: `${API_BASE_URL}/api/rooms`,
  ROOM_CALENDAR: (roomId) => `${API_BASE_URL}/api/rooms/calendar/${roomId}`,
  BOOK_ROOM: (roomId) => `${API_BASE_URL}/api/rooms/book/${roomId}`,
  CHECK_AVAILABILITY: `${API_BASE_URL}/api/rooms/check-availability`,
  USER_BOOKINGS: (userId) => `${API_BASE_URL}/api/rooms/user-bookings/${userId}`,
};

export default API_BASE_URL; 