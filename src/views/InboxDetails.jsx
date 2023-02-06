import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DocumentInfo from '../components/DocumentInfo';
import ReceivePdf from '../views/ReceivePdf';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const access_token = localStorage.getItem('access_token');

export default function DocumentDetails() {
  const { pathname } = useLocation();
  const id = pathname.slice(1).split('/').at(1);
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

      console.log(data);

      // dispatcher({
      //   type: 'pdf/setDocumentId',
      //   payload: data.data.Documents[0].id,
      // });

      const index = data.data.Documents.length - 1;

      const isCompleted = data.data.status === 'completed' ? true : false;
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
        });
      } else {
        histories = Object.assign(documents[0], { message: data.data.message });
      }

      console.log(histories);

      dispatcher({
        type: 'pdf/setDocumentDetail',
        payload: {
          documentId: data.data.Documents[index].id,
          docName: data.data.Documents[index].documentName,
          messageId: data.data.id,
          previousMessage: data.data.message,
          isCompleted,
          histories: histories.reverse(),
        },
      });

      setMessageData(data);
    } catch (error) {
      console.log(error);
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
