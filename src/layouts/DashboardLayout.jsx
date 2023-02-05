import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UploadOptionModal from "../components/UploadOptionModal";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="ml-[240px] mt-[92px] pt-4 px-8">
        <Outlet />
      </main>
    </>
  );
}
