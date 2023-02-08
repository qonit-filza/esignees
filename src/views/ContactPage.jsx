import { useEffect, useState } from "react";
import UserPreview from "../components/UserPreview";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ContactList from "../components/ContactList";

export default function ContactPage() {
  const [contactList, setContactList] = useState([]);
  const [contactDetails, setContactDetails] = useState({});
  const [addContact, setAddContact] = useState(false);
  const [input, setInput] = useState({
    email: "",
})
const handleToAddContact = () => {
  setAddContact(!addContact);
};
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const newInput = {...input, [e.target.name] : e.target.value}
    setInput(newInput)
}
 


  // SHOW ALL CONTACT
  const FetchContacts =  async () => {
    try {
      let {data} = await axios({
        url : `http://localhost:3000/contacts`, 
        method : "get",
        headers : {
          'access_token' : localStorage.getItem("access_token")
        },
      })
      setContactList(data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      })
    }
  }

  // ADD CONTACT 
  const handleAddContact = async (input) => {
    try {
       let {result} = await axios({
        url : `http://localhost:3000/contacts`, 
        method : "post",
        headers : {
          'access_token' : localStorage.getItem("access_token")
        },
        data : input
      })
      FetchContacts()
      setContactList(result)
    } catch (error) {
      throw error
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!input.email){
        return setError("Please Fill a email address")
    }

    handleAddContact(input)
    .then(()=>{
      FetchContacts()
        navigate("/contacts")
    })
    .catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`,
      })
    })
  }

  //DELETE CONTACT
  const deleteContact = async (id) =>{
    try {
      let {result} = await axios({
        url : `http://localhost:3000/contacts/${id}`, 
        method : "delete",
        headers : {
          'access_token' : localStorage.getItem("access_token")
        },
      })
      FetchContacts()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      })
    }
  }

  useEffect(() => {
    FetchContacts()
  }, []);

  return (
    <>
      <section className="mt-4 flex justify-between h-[80vh] gap-4">
        <div className="border-2 p-4 rounded-xl flex flex-col items-center w-1/3">
          <button
          onClick={handleToAddContact}
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
            {contactList?.map((el, i) => {
              <UserPreview name={el.User.name} company={el.User.jobTitle} />
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
                  <ContactList name={el.User.name} company={el.User.jobTitle} />
                </div>
              );
            })}
          </div>
        </div>

        {addContact ? (
          <div className="border-2 rounded-xl  p-4 w-full flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit}>
            <p className="text-2xl font-semibold text-center mb-3">
              Create New Contact
            </p>
            <div>
              <input
                type="text"
                className="outline-none border-2 w-full rounded-xl px-3 py-1"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <button className="bg-theme-3 px-4 py-2 text-white rounded-xl mt-4" type="submit">
              Add Contact
            </button>
          </form>
          </div>
        ) : (
          <div className="border-2 rounded-xl w-full relative">
          {/* {contactList.map((el, i) => { */}
            <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg">
              <button className="px-3 py-1 rounded-lg hover:bg-red-300 bg-red-400 text-white hover:text-white" onClick={()=>deleteContact(contactDetails.id)}>
                Delete
              </button>
            </div>
          {/* // })} */}

            <div className="rounded-t-xl flex flex-col items-center justify-center bg-sky-50 px-8 pt-6 pb-4 border-b-2">
              <div className="bg-theme-3 mx-auto w-24 h-24 rounded-full flex items-center justify-center border-4">
                <p className="text-5xl font-semibold tracking-wide text-white">
                  {contactDetails.User?.name?.split(" ")
      .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
      .join("")}
                </p>
              </div>
              <p className=" text-2xl font-semibold mt-4">
                {contactDetails.User?.name}
              </p>
            </div>
            <div className="px-8 py-4 tracking-wide flex flex-col gap-3 mt-2">
              <div>
                <p className="">Full Name</p>
                <p className=" text-2xl font-semibold">{contactDetails.User?.name}</p>
              </div>
              <div>
                <p className="">Job Title</p>
                <p className=" text-2xl font-semibold">
                  {contactDetails.User?.jobTitle}
                </p>
              </div>
              <div>
                <p className="">Email Address</p>
                <p className=" text-2xl font-semibold">
                  {contactDetails.User?.email}
                </p>
              </div>
              <div>
                <p className="">Phone Number</p>
                <p className=" text-2xl font-semibold">{contactDetails.User?.phone}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
