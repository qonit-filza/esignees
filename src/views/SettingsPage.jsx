import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalEditSignature from '../components/ModalEditSignature';
import { fetchUserAction } from '../stores/actionCreator';
import { toast } from 'react-toastify';
// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://api-esignees.ghzytp.site';
const access_token = localStorage.getItem('access_token');

export default function SettingsPage() {
  const { user } = useSelector((state) => state.users);

  const [editState, setEditState] = useState(false);
  const [editSignature, setEditSignature] = useState(false);
  const [editSignatureType, setEditSignatureType] = useState('');

  const [editForm, setEditForm] = useState({
    name: user.name,
    jobTitle: user.jobTitle,
    email: user.email,
    phone: user.phone,
  });
  const dispatcher = useDispatch();

  const changeToEditForm = () => {
    setEditState(!editState);
    resetForm();
  };

  const resetForm = () => {
    setEditForm({
      name: user.name,
      jobTitle: user.jobTitle,
      email: user.email,
      phone: user.phone,
    });
  };

  useEffect(() => {
    setEditSignatureType(`${user.signature ? 'Edit' : 'Add'}`);
  }, [user]);

  const changeToEditSignature = () => {
    setEditSignature(!editSignature);
  };

  const handleSaveEdit = async () => {
    try {
      const { data } = await axios.put(`${baseUrl}/profiles`, editForm, {
        headers: {
          access_token,
        },
      });
      toast.success(data.message);
      await dispatcher(fetchUserAction());
      changeToEditForm();
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleFormOnChange = (e) => {
    const newValue = { ...editForm };
    newValue[e.target.name] = e.target.value;
    setEditForm(newValue);
  };

  const refetchUser = async () => {
    await dispatcher(fetchUserAction());
  };

  return (
    <>
      <ModalEditSignature
        hideShowEditSignature={editSignature}
        closeEditSignature={changeToEditSignature}
        refetchUser={refetchUser}
        editSignatureType={editSignatureType}
      />
      <div className="flex gap-6 h-[80vh]">
        <div className="flex flex-col gap-4 border-2 p-6 rounded-xl relative pt-8 w-full">
          <button
            onClick={() => {
              changeToEditForm();
            }}
            className="absolute top-4 right-4 bg-theme-3 text-white hover:bg-theme-1 hover:text-white px-4 py-1 rounded-xl"
          >
            {!editState ? 'Edit Profile' : 'Cancel'}
          </button>

          {editState && (
            <button
              onClick={handleSaveEdit}
              className="absolute top-4 right-28 bg-theme-3 text-white hover:bg-theme-1 hover:text-white px-4 py-1 rounded-xl"
            >
              Save
            </button>
          )}

          <div>
            <p className="text-sm">Full Name</p>
            {!editState ? (
              <p className="text-lg">{user.name}</p>
            ) : (
              <input
                value={editForm.name}
                onChange={handleFormOnChange}
                name="name"
                type="text"
                className="border-2 rounded-xl px-2 py-1 outline-none border-theme-1 mt-1 w-1/4"
              />
            )}
          </div>
          <div>
            <p className="text-sm">Job Title</p>
            {!editState ? (
              <p className="text-lg">{user.jobTitle}</p>
            ) : (
              <input
                value={editForm.jobTitle}
                onChange={handleFormOnChange}
                name="jobTitle"
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
                disabled
                value={user.company}
                name="company"
                type="text"
                className="border-2 rounded-xl px-2 py-1 outline-none border-theme-1 mt-1 w-1/4 cursor-not-allowed"
              />
            )}
          </div>
          <div>
            <p className="text-sm">Email Address</p>
            {!editState ? (
              <p className="text-lg">{user.email}</p>
            ) : (
              <input
                value={editForm.email}
                onChange={handleFormOnChange}
                name="email"
                type="email"
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
                value={editForm.phone}
                onChange={handleFormOnChange}
                name="phone"
                type="number"
                className="border-2 rounded-xl px-2 py-1 outline-none border-theme-1 mt-1 w-1/4"
              />
            )}
          </div>
          <div>
            {!editState && (
              <>
                <div className=" flex flex-row text-sm gap-2">
                  <p>Signature</p>
                  <span
                    onClick={changeToEditSignature}
                    className=" bg-blue-200 px-2 rounded-full hover:bg-blue-300 cursor-pointer"
                  >
                    {editSignatureType}
                  </span>
                </div>

                <>
                  {user.signature ? (
                    <div className="w-[40vh] rounded-xl  mt-2">
                      <img src={user.signature} alt="user_signature" />
                    </div>
                  ) : (
                    <p className=" text-lg">Start adding your signature</p>
                  )}
                </>

                <>
                  {/* <div className="border-2 w-1/4 p-2 rounded-xl mt-2 border-theme-1">
                    <input type="file" />
                  </div>
                  <div className="border-2 w-1/4 p-2 rounded-xl mt-2 border-theme-1">
                    <SignaturePad />
                  </div> */}
                </>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
