import { useEffect, useState } from 'react';
import SubcriptionPage from '../components/SubcriptionPage';
import axios from 'axios';
import { toast } from 'react-toastify';
const baseUrl = 'https://api-esignees.ghzytp.site';

export default function OrganizationPage() {
  const [company, setCompany] = useState({});

  const FetchCompany = async () => {
    try {
      let { data } = await axios({
        url: `${baseUrl}/companies`,
        method: 'get',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      });
      setCompany(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    FetchCompany();
  }, []);
  return (
    <>
      {company.status === 'Subscription' ? (
        <div className="flex flex-col gap-2">
          <p>Organization Name</p>
          <p className="text-2xl font-semibold">{company.nameCompany}</p>
          <p>Company Invite Code</p>
          <p className="text-2xl font-semibold">{company.companyInviteCode}</p>
          <p>Industry</p>
          <p className="text-2xl font-semibold">{company.industry}</p>
          <p>Subcription Status</p>
          <p className="text-2xl font-semibold">{company.status}</p>
          <p>Expired date</p>
          <p className="text-2xl font-semibold">
            {company.dueDate?.slice(0, 10)}
          </p>
        </div>
      ) : (
        <SubcriptionPage />
      )}
    </>
  );
}
