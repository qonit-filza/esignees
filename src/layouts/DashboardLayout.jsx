import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    <section className="container flex w-full">
      <Sidebar />
      <Navbar />
      <div className="ml-[240px] mt-[92px] w-full">
        <Outlet />
      </div>
    </section>
  );
}
