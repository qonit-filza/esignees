import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emptyTable from '../assets/img/dog_walk.png';
import { localeDate } from '../helpers/dateHelper';
import { toast } from 'react-toastify';
const baseUrl = 'https://api-esignees.ghzytp.site';

export default function SentPage() {
  const navigate = useNavigate();
  const [sentData, setSentData] = useState([]);

  const fetchSentData = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/sents`, {
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      });

      setSentData(data.messageSender);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
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
                <th className="py-2">Receiver</th>
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
                  <tbody key={'sent-' + el.id}>
                    <tr className="border-b-2 hover:bg-sky-50 hover:font-semibold cursor-pointer">
                      <td className="py-2">
                        <input type="checkbox" />
                      </td>
                      <td
                        onClick={() => navigate(`/sent/${el.id}`)}
                        className="py-2 text-left"
                      >
                        {el.Documents[0].documentName}
                      </td>
                      <td className="py-2">{localeDate(el.createdAt)}</td>
                      <td className="py-2">{el.Receiver.name}</td>
                      <td className="py-2">
                        {el.Receiver.Company.nameCompany}
                      </td>
                      <td className="py-2">
                        <div
                          className={
                            'w-fit mx-auto px-3 py-1 rounded-md text-xs tracking-wide font-semibold ' +
                            `${
                              el.status === 'completed'
                                ? 'bg-green-200'
                                : `${
                                    el.status === 'rejected'
                                      ? 'bg-red-200'
                                      : 'bg-yellow-200'
                                  }`
                            }`
                          }
                        >
                          {el.status === 'completed'
                            ? 'Completed'
                            : `${
                                el.status === 'rejected'
                                  ? 'Rejected'
                                  : 'On process'
                              }`}
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
