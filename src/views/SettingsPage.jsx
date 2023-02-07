import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SignaturePad from '../components/SignaturePad';

export default function SettingsPage() {
  const [editState, setEditState] = useState(false);
  const { user } = useSelector((state) => state.users);

  const changeToEditForm = () => {
    setEditState(!editState);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex gap-6 h-[80vh]">
        <div className="flex flex-col gap-4 border-2 p-6 rounded-xl relative pt-8 w-full">
          <button
            onClick={() => {
              changeToEditForm();
            }}
            className="absolute top-4 right-4 bg-theme-3 text-white hover:bg-theme-1 hover:text-white px-4 py-1 rounded-xl"
          >
            Edit
          </button>
          <div>
            <p className="text-sm">Full Name</p>
            {!editState ? (
              <p className="text-lg">{user.name}</p>
            ) : (
              <input
                type="text"
                className="border-2 rounded-xl px-2 py-1 outline-none border-theme-1 mt-1 w-1/4"
              />
            )}
          </div>
          <div>
            <p className="text-sm">Organization</p>

            {!editState ? (
              <p className="text-lg">{user.company}</p>
            ) : (
              <input
                type="text"
                className="border-2 rounded-xl px-2 py-1 outline-none border-theme-1 mt-1 w-1/4"
              />
            )}
          </div>
          <div>
            <p className="text-sm">Email Address</p>
            {!editState ? (
              <p className="text-lg">{user.email}</p>
            ) : (
              <input
                type="text"
                className="border-2 rounded-xl px-2 py-1 outline-none border-theme-1 mt-1 w-1/4"
              />
            )}
          </div>
          <div>
            <p className="text-sm">Phone Number</p>
            {!editState ? (
              <p className="text-lg">{user.phone}</p>
            ) : (
              <input
                type="text"
                className="border-2 rounded-xl px-2 py-1 outline-none border-theme-1 mt-1 w-1/4"
              />
            )}
          </div>
          <div>
            <p className="text-sm">Signature</p>
            {!editState ? (
              <div className="w-[40vh] rounded-xl  mt-2">
                <img src={user.signature} alt="user_signature" />
                {/* <button className="text-xs mx-auto hover:underline text-red-400 w-fit">
                  Remove Signature
                </button> */}
              </div>
            ) : (
              // <div className="border-2 w-1/4 p-2 rounded-xl mt-2 border-theme-1">
              //   <input type="file" />
              // </div>
              <div className="border-2 w-1/4 p-2 rounded-xl mt-2 border-theme-1">
                <SignaturePad />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
