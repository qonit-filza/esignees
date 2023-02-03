import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    <section className="container flex w-full">
      <Sidebar />
      <Navbar />
      <div className="ml-[220px] mt-[116px] w-full px-6">
        <Outlet />
      </div>
    </section>
  );
}
