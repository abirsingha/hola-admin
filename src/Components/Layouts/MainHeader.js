import React, {useState, useRef, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Store/AuthContext";
import Logo from "../../Assests/logo.png";
import notificationIcon from "../../Assests/notifications.png";
import profilePicture from "../../Assests/user.png"


const MainHeader = (props) => {
  const authCtx = useContext(AuthContext);
  const items = localStorage.getItem('details');
  const itemObj = JSON.parse(items);
  const email = itemObj.email;
  const userName = email.slice(0, email.indexOf('@'));
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownToggleHandler = () => {
    setIsOpen(!isOpen);
  };
  const node = useRef();
    const clickOutside = (e) => { 
        if (node.current.contains(e.target)) { 
          setIsOpen(isOpen);
            return;
        }
      setIsOpen(false);
    }
    useEffect(() => {
        document.addEventListener('click', clickOutside);
        return () => {
            document.removeEventListener('click', clickOutside);
        }
    }, [isOpen]);
  
    const logoutHandler = () => {
      authCtx.logout();
      navigate('/');
  }

  useEffect(() => {
    window.addEventListener('scroll', isFixed);
    return () => {
        window.removeEventListener('scroll', isFixed);
    };
  });

  const isFixed = (e) => {
      const header = document.querySelector('.siteHeader');
      const scrollTop = window.scrollY;
      scrollTop >= 0 ? header.classList.add('fixed') : header.classList.remove('fixed');
  };

  return (
    <header className="siteHeader">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 col-md-6">
            <div className="classes.logo d-flex align-items-center">
              <img src={Logo} className="img-fluid" alt="" />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <div className="userInfo">
              <ul>
                <li>
                  <Link to="/notification">
                  <img src={notificationIcon} alt="" className="img-fluid" />
                  <span className="number">99</span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <ul>
                  <li ref={node}
                    className="dropdown-toggle mr-0"
                    to={''}
                    onClick={dropdownToggleHandler}
                    >Welcome <span className="username">{userName}</span>
                    <img
                      src={profilePicture}
                      className="img-fluid"
                      alt=""
                    />
                    </li>
                  </ul>
                  <div className={`dropdown-menu ${isOpen ? "show" : ""}`} >
                    <Link className="dropdown-item" to="/">
                      {email}
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/settings">
                      Profile
                    </Link>
                    <Link className="dropdown-item" to="/help">
                      Help
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link onClick={logoutHandler} className="dropdown-item" to="/">
                      Sign Out
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
