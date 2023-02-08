import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DocumentInfo from '../components/DocumentInfo';
import ReceivePdf from '../views/ReceivePdf';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
const access_token = localStorage.getItem('access_token');

export default function DocumentDetails() {
  const { pathname } = useLocation();
  const [page, id] = pathname.slice(1).split('/');
  const dispatcher = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const [messageData, setMessageData] = useState('');

  const seletView = () => {
    setShowInfo(!showInfo);
  };

  const fetchMessage = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/sents/${id}`, {
        headers: {
          access_token,
        },
      });

      const index = data.data.Documents.length - 1;
      const isCompleted = data.data.status === 'completed' ? true : false;
      const isRejected = data.data.status === 'rejected' ? true : false;
      let histories;

      const documents = data.data.Documents;
      if (documents.length > 1) {
        const messageArr = data.data?.message.split('!@#$%');
        const receiverArr = [data.data.Receiver.name, data.data.Sender.name];
        histories = data.data.Documents.map((el, i) => {
          return {
            ...el,
            message: messageArr[i],
            receiver: receiverArr[i],
          };
        }).reverse();
      } else {
        if (isRejected) {
          histories = [
            Object.assign(documents[0], {
              message: data.data.message.split('!@#$%')[0],
              receiver: data.data.Receiver.name,
              rejectionDate: data.data.updatedAt,
              rejectionMessage: data.data.message.split('!@#$%')[1],
            }),
          ];
        } else {
          histories = [
            Object.assign(documents[0], {
              message: data.data.message,
              receiver: data.data.Receiver.name,
            }),
          ];
        }
      }

      dispatcher({
        type: 'pdf/setDocumentDetail',
        payload: {
          page,
          documentId: data.data.Documents[index].id,
          docName: data.data.Documents[index].documentName,
          messageId: data.data.id,
          previousMessage: data.data.message,
          isCompleted,
          histories,
          isRejected,
        },
      });

      setMessageData(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      });
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setShowInfo(false)}
          className={
            !showInfo
              ? 'flex items-center border-2 px-4 py-1 rounded-xl gap-1 hover:bg-sky-100 hover:text-theme-2 bg-sky-100 text-theme-2'
              : 'flex items-center border-2 px-4 py-1 rounded-xl gap-1 text-theme-3 hover:bg-sky-100 hover:text-theme-2'
          }
        >
          <span className="material-symbols-outlined">description</span>
          <p>Document</p>
        </button>
        <button
          onClick={() => setShowInfo(true)}
          className={
            showInfo
              ? 'flex items-center border-2 px-4 py-1 rounded-xl gap-1 hover:bg-sky-100 hover:text-theme-2 bg-sky-100 text-theme-2'
              : 'flex items-center border-2 px-4 py-1 rounded-xl gap-1 text-theme-3 hover:bg-sky-100 hover:text-theme-2'
          }
        >
          <span className="material-symbols-outlined">lightbulb</span>
          <p>Information</p>
        </button>
      </div>

      {showInfo ? (
        <DocumentInfo />
      ) : (
        <div className="border-2 h-[80vh] overflow-y-auto scoll mt-4 rounded-xl bg-sky-50">
          <ReceivePdf />
        </div>
      )}
    </>
  );
}
