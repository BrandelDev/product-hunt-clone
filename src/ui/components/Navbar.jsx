import { Link, NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../auth";
import logoNavbar from "../../assets/NavBar/logo-product-hunt-navbar.png"
import './Navbar.css'

export const Navbar = () => {

 

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const onLogout = () => {
        logout();

        navigate('/login', {
            replace: true
        });
    }

       const signInButtonStyles = {
        color:'transparent',
        textDecoration: 'unset'
      };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">

                <div className="py-2 d-flex justify-content-center">
                    <img className="me-3" width='32' height='32' src={logoNavbar} />
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" >Launches</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Products</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" >News</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Advertise</a>
                        </li>
                    </ul>

                </div>

                <div className="d-flex justify-content-end align-items-center">
                    <ul className="navbar-nav">
                        <li className="d-flex  align-items-center nav-item" >
                            <a>How to post?</a>
                        </li>
                        <li className='ms-3 sign-in-buttom'>
                            <NavLink to='/welcome'><a style={signInButtonStyles} className="decoration-link">Sing in</a></NavLink>
                        </li>
                    </ul>
                </div>

            </nav>
            {/* <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand text-light"> RetroGames </Link>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/retro" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Retro</NavLink>
            </li>
          </ul>
          <span className="nav-item navbar-link text-primary">
            {user?.name}
          </span>
          <button className="nav-item nav-link btn text-light" onClick={() => onLogout()}>
            Logout
          </button>
        </div>
      </nav> */}
        </>
    )
}