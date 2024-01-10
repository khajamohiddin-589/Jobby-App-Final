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
    history.push('/login')
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
          <div className="header-icons-container">
            <Link to="/" className="nav-link">
              <TiHome className="react-icon" />
            </Link>
            <Link to="/jobs" className="nav-link">
              <BsFillBriefcaseFill className="react-icon" />
            </Link>
            <Link to="/login">
              <FiLogOut onClick={onClickLogout} className="react-icon" />
            </Link>
          </div>
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
          <div className="home-jobs-container">
            <Link to="/" className="nav-link">
              <h1 className="nav-heading">Home</h1>
            </Link>
            <Link to="/jobs" className="nav-link">
              <h1 className="nav-heading">Jobs</h1>
            </Link>
          </div>
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
