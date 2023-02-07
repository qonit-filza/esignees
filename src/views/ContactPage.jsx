import { useEffect, useState } from "react";
import UserPreview from "../components/UserPreview";
import axios from "axios";

export default function ContactPage() {
  const [contactList, setContactList] = useState([]);
  const [contactDetails, setContactDetails] = useState({});
  const [addContact, setAddContact] = useState(false);

  const handleAddContact = () => {
    setAddContact(!addContact);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setContactList(data);
      setContactDetails(data[0]);
    })();
  }, []);
  return (
    <>
      <section className="mt-4 flex justify-between h-[80vh] gap-4">
        <div className="border-2 p-4 rounded-xl flex flex-col items-center w-1/3">
          <button
            onClick={handleAddContact}
            className="bg-theme-3 px-3 py-2 rounded-xl mb-2 text-white w-full hover:bg-sky-400"
          >
            Add Contact
          </button>
          <div className="mx-2 flex items-center gap-1 border-2 rounded-xl px-2 py-1 w-full">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              className="outline-none"
              placeholder="Search Contact"
            />
          </div>
          <div className="overflow-y-auto scrollbar h-[84%] pr-2 mt-2 w-full">
            {contactList.map((el, i) => {
              return (
                <div
                  onClick={() => {
                    setContactDetails(el);
                  }}
                  key={i}
                  className={
                    contactDetails.id == el.id
                      ? "hover:bg-slate-100 px-4 py-3 rounded-lg bg-slate-100"
                      : "hover:bg-slate-100 px-4 py-3 rounded-lg"
                  }
                >
                  <UserPreview name={el.name} company={el.company.name} />
                </div>
              );
            })}
          </div>
        </div>

        {addContact ? (
          <div className="border-2 rounded-xl  p-4 w-full flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold text-center mb-3">
              Create New Contact
            </p>
            <div>
              <input
                type="text"
                className="outline-none border-2 w-full rounded-xl px-3 py-1"
                placeholder="Email"
              />
            </div>
            <button className="bg-theme-3 px-4 py-2 text-white rounded-xl mt-4">
              Add Contact
            </button>
          </div>
        ) : (
          <div className="border-2 rounded-xl w-full relative">
            <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg">
              <button className="px-3 py-1 rounded-lg hover:bg-red-300 bg-red-400 text-white hover:text-white">
                Delete
              </button>
            </div>
            <div className="rounded-t-xl flex flex-col items-center justify-center bg-sky-50 px-8 pt-6 pb-4 border-b-2">
              <div className="bg-theme-3 mx-auto w-24 h-24 rounded-full flex items-center justify-center border-4">
                <p className="text-5xl font-semibold tracking-wide text-white">
                  LG
                </p>
              </div>
              <p className=" text-2xl font-semibold mt-4">
                {contactDetails.name}
              </p>
            </div>
            <div className="px-8 py-4 tracking-wide flex flex-col gap-3 mt-2">
              <div>
                <p className="">Full Name</p>
                <p className=" text-2xl font-semibold">{contactDetails.name}</p>
              </div>
              <div>
                <p className="">Organization</p>
                <p className=" text-2xl font-semibold">
                  {contactDetails?.company?.name}
                </p>
              </div>
              <div>
                <p className="">Email Address</p>
                <p className=" text-2xl font-semibold">
                  {contactDetails.email}
                </p>
              </div>
              <div>
                <p className="">Phone Number</p>
                <p className=" text-2xl font-semibold">+62822323232</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
