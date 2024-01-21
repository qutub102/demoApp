import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar";
import './PageLayout.css'

interface Props {}

function PageLayout({}: Props) {
  return (
    <div className="pageLayout">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default PageLayout;
