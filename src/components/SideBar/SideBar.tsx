import { Navbar, Nav, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import logo from './path/to/your/logo.png';
import "./Sidebar.css"; // Import the CSS file
import { useAppDispatch } from "../../store/hooks";
import { addNewChat } from "../../store/reducers/chatReducer";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <Navbar className="sidebar" bg="light" variant="light">
      {/* Logo and GENAI text */}
      <Navbar.Brand>
        <Image
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8GfgXE4_uTMWrel0GKrBGY90M2q5vcfLKpw&usqp=CAU"
          }
          alt="Logo"
          width="30"
          height="30"
          className="d-inline-block align-top img-logo"
        />
        {" GEN AI"}
      </Navbar.Brand>

      {/* Button with plus icon and text */}
      <Button
        variant="dark"
        className="mb-4 button"
        onClick={() => {
          dispatch(addNewChat({}));
          navigate("/");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg icon-plus"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
          />
        </svg>
        New
      </Button>

      {/* Navigation links */}
      <Nav className="flex-column nav-head">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "headerNavPageLinkActive nav-link"
              : "headerNavPageLink nav-link"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat-left icon-plus"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          </svg>{" "}
          My Chat
        </NavLink>
        <NavLink
          to="/mydocuments"
          className={({ isActive }) =>
            isActive
              ? "headerNavPageLinkActive nav-link"
              : "headerNavPageLink nav-link"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat-left icon-plus"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          </svg>{" "}
          My Documents
        </NavLink>
        <NavLink
          to="/savedchats"
          className={({ isActive }) =>
            isActive
              ? "headerNavPageLinkActive nav-link"
              : "headerNavPageLink nav-link"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat-left icon-plus"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          </svg>{" "}
          My Saved Chat
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "headerNavPageLinkActive nav-link"
              : "headerNavPageLink nav-link"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chat-left icon-plus"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          </svg>{" "}
          About
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
