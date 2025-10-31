import React, {useState} from 'react'
import '/src/Css/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { faList } from '@fortawesome/free-solid-svg-icons'


const Navbar = ({ user}) => {
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();


   const handleLogout = async () => {
    try {
      // call backend logout (token is sent via header)
      await api.post('/logout');
    } catch (err) {
      // ignore errors but still remove token
      console.warn(err);
    }
    localStorage.removeItem('token');
    navigate('/');
  };

  
  return (
    <nav className="navbar">
      <div className="logo"><FontAwesomeIcon icon={faList} /> To-Do List</div>

      <div className="profile-menu">
        
        <button
          className="profile-btn"
          onClick={() => setOpen(!open)}
        >
          {user?.name} <FontAwesomeIcon icon={faAngleDown} />
        </button>

        {open && (
          <div className="dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar
