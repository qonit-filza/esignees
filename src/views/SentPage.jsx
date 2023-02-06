import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emptyTable from '../assets/img/dog_walk.png';

export default function SentPage() {
  const navigate = useNavigate();
  const [sentData, setSentData] = useState([]);

  const fetchSentData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/sents', {
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      });

      setSentData(data.messageReceiver);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSentData();
  }, []);

  return (
    <>
      <div className="border-2 rounded-xl p-4 mt-4">
        <div className=" font-light overflow-y-auto h-[70vh] scrollbar">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b-2 border-b-theme-1 bg-white">
                <th className="py-2">
                  <input type="checkbox" />
                </th>
                <th className="py-2">Document Title</th>
                <th className="py-2">Date</th>
                <th className="py-2">Sender</th>
                <th className="py-2">Organization</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            {sentData.length < 1 ? (
              <tbody>
                <tr>
                  <td colSpan={6}>
                    <div className="flex flex-col justify-center items-center my-4">
                      <img
                        src={emptyTable}
                        alt="image"
                        className="h-[300px] object-contain"
                      />
                      <p>The Inbox is Empty</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              sentData.map((el, i) => {
                return (
                  <tbody key={i}>
                    <tr className="border-b-2 hover:bg-sky-50 hover:font-semibold cursor-pointer">
                      <td className="py-2">
                        <input type="checkbox" />
                      </td>
                      <td
                        onClick={() => navigate(`/inbox/${i}`)}
                        className="py-2 text-left"
                      >
                        {el.Documents[0].metaTitle}
                      </td>
                      <td className="py-2">{el.createdAt}</td>
                      <td className="py-2">{el.Sender.name}</td>
                      <td className="py-2">{el.Sender.Company.nameCompany}</td>
                      <td className="py-2">
                        <div className="bg-green-200 w-fit mx-auto px-3 py-1 rounded-md text-xs tracking-wide font-semibold">
                          {el.status}
                        </div>
                      </td>
                      <td className="w-20">
                        <div className="flex gap-4 w-fit mx-auto hover:text-red-400">
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            )}
          </table>
        </div>
      </div>
    </>
  );
}
