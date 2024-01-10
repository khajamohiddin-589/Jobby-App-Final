import Cookies from 'js-cookie'

import {TiHome} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <div className="small-nav-container">
        <div className="small-devices-header">
          <Link to="/" className="nav-link">
            <img
              className="header-website-logo-small"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="header-icons-container">
            <Link to="/" className="nav-link">
              <li>
                <TiHome className="react-icon" />
              </li>
            </Link>
            <Link to="/jobs" className="nav-link">
              <li>
                <BsFillBriefcaseFill className="react-icon" />
              </li>
            </Link>
            <Link to="/login">
              <li>
                <FiLogOut onClick={onClickLogout} className="react-icon" />
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="large-nav-container">
        <div className="large-devices-header">
          <Link to="/" className="nav-link">
            <img
              className="header-website-logo-large"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="home-jobs-container">
            <Link to="/" className="nav-link">
              <li className="nav-heading">Home</li>
            </Link>
            <Link to="/jobs" className="nav-link">
              <li className="nav-heading">Jobs</li>
            </Link>
          </ul>
          <button
            onClick={onClickLogout}
            type="button"
            className="header-logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
