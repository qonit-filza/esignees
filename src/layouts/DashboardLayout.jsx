import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="ml-[240px] mt-[92px] px-6">
        <Outlet />
      </div>
    </>
  );
}
