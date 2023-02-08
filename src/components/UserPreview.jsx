import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction } from '../stores/actionCreator';
import { toast } from 'react-toastify';
import axios from 'axios';
const baseUrl = 'http://localhost:3000';

export default function UserPreview({ name, company }) {
  const { user } = useSelector((state) => state.users);
  const [doneCheckCompany, setDoneCheckCompany] = useState(false);
  const dispatcher = useDispatch();

  let nameInitial = user.name;
  if (nameInitial) {
    nameInitial = nameInitial
      .split(' ')
      .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
      .join('');
  }

  const fetchData = () => {
    dispatcher(fetchUserAction());
  };

  const checkCompanyStatus = async () => {
    try {
      const { data } = await axios.put(
        `${baseUrl}/companies/check`,
        {},
        {
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        }
      );

      if (data?.message) {
        toast.info(data.message, { autoClose: false });
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user.id) return;
    fetchData();
  }, []);

  useEffect(() => {
    if (doneCheckCompany) return;
    checkCompanyStatus();
    setDoneCheckCompany(true);
  }, []);

  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-9 h-9 rounded-full bg-theme-3 flex items-center justify-center text-white">
          <p className="font-semibold">{nameInitial}</p>
        </div>
        <div>
          <p className="font-semibold tracking-wide hover:underline">
            {user.name || 'John Claymore'}
          </p>
          <p className="text-xs">{user.company || 'Hacktiv8'}</p>
        </div>
      </div>
    </>
  );
}
