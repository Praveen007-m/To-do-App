import React, {useState} from 'react'
import '/src/Css/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">To-Do List</div>

      <div className="profile-menu">
        <button
          className="profile-btn"
          onClick={() => setOpen(!open)}
        >
          {user?.name} <FontAwesomeIcon icon={faAngleDown} />
        </button>

        {open && (
          <div className="dropdown">
            <button onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar
