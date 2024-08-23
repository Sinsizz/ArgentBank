import { setUserProfile } from './userSlice';

export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUserProfile(data.body));
    } else {
      // Gérer les erreurs
      console.error('Failed to fetch user profile');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};