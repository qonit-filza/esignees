import { useEffect, useState } from "react";
import UserPreview from "../components/UserPreview";
import axios from "axios";

export default function ContactPage() {
  const [contactList, setContactList] = useState([]);
  const [contactDetails, setContactDetails] = useState({});
  const [editValue, setEditValue] = useState(false);


  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setContactList(data);
      setContactDetails(data[0])
    })();

  }, []);
  return (
    <>
      <section className="mt-4 flex justify-between h-[80vh] px-2 gap-4">
        <div className="border-2 p-4 rounded-xl w-[460px]">
          <div className="mx-2 flex items-center gap-1 border-2 rounded-xl px-2 py-1">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              className="outline-none"
              placeholder="Search Contact"
            />
          </div>
          <div className="overflow-y-auto scrollbar h-[90%] pr-2 mt-2">
            {contactList.map((el, i) => {
              return (
                <div
                  onClick={() => {
                    setContactDetails(el);
                  }}
                  key={i}
                  className={contactDetails.id == el.id ? "hover:bg-slate-100 px-4 py-3 rounded-lg bg-slate-100" : "hover:bg-slate-100 px-4 py-3 rounded-lg"}
                >
                  <UserPreview name={el.name} company={el.company.name} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-2 rounded-xl w-full relative">
            <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg">
                <button onClick={() => setEditValue(!editValue)} className="pl-3 py-1 pr-2 border-r-2 border-theme-1  rounded-l-lg hover:bg-green-400 hover:text-white w-16">Edit</button>
                <button className="pr-3 py-1 pl-2  rounded-r-lg hover:bg-red-400  hover:text-white">Delete</button>
            </div>
          <div className="rounded-t-xl flex flex-col items-center justify-center bg-sky-50 px-8 pt-8 pb-4">
            <div className="bg-red-300 mx-auto w-36 h-36 rounded-full overflow-hidden ring-theme-1 ring-offset-4 ring-2 border-theme-1 ">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="profile_photo"
                className="object-cover"
              />
            </div>
            <p className=" text-2xl font-semibold mt-4">
              {contactDetails.name}
            </p>
          </div>
          <div className="px-8 py-4 tracking-wide flex flex-col gap-3 mt-2">
            <div>
              <p className="">Full Name</p>
              {!editValue ? (
                <p className=" text-2xl font-semibold hover:underline ">
                  {contactDetails.name}
                </p>
              ) : (
                <input
                  type="text"
                  className="outline-none border-2 text-xl px-4 py-1 font-semibold rounded-xl w-full"
                  value={contactDetails.name}
                />
              )}
            </div>
            <div>
              <p className="">Organization</p>
              {!editValue ? (
                <p className=" text-2xl font-semibold hover:underline ">
                  {contactDetails?.company?.name}
                </p>
              ) : (
                <input
                  type="text"
                  className="outline-none border-2 text-xl px-4 py-1 font-semibold rounded-xl w-full"
                  value={contactDetails?.company?.name}
                />
              )}
            </div>
            <div>
              <p className="">Email Address</p>
              {!editValue ? (
                <p className=" text-2xl font-semibold hover:underline ">
                  {contactDetails.email}
                </p>
              ) : (
                <input
                  type="text"
                  className="outline-none border-2 text-xl px-4 py-1 font-semibold rounded-xl w-full"
                  value={"johnclaymore@mail.com"}
                />
              )}
            </div>
            <div>
              <p className="">Phone Number</p>
              {!editValue ? (
                <p className=" text-2xl font-semibold hover:underline ">
                  +62822323232
                </p>
              ) : (
                <input
                  type="text"
                  className="outline-none border-2 text-xl px-4 py-1 font-semibold rounded-xl w-full"
                  value={"+62822323232"}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
