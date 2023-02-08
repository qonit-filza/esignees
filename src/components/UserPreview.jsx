import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction } from '../stores/actionCreator';

export default function UserPreview({ name, company }) {
  const { user } = useSelector((state) => state.users);
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

  useEffect(() => {
    if (user.id) return;
    fetchData();
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
