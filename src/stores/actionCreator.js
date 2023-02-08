import axios from 'axios';
import Swal from 'sweetalert2';
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
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`,
      });
    }
  };
};
