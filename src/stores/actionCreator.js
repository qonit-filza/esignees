import axios from 'axios';
import { toast } from 'react-toastify';
const baseUrl = 'http://localhost:3000';

const actionUserSetUser = (payload) => {
  return {
    type: 'user/setUser',
    payload,
  };
};

export const fetchUserAction = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${baseUrl}/profiles`, {
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      });

      dispatch(actionUserSetUser(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
