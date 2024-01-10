import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMessage: errorMsg})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  loginFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form onSubmit={this.loginFormSubmit} className="login-form-container">
          <img
            className="logo-image"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input-container">
            <label htmlFor="username" className="login-label">
              USERNAME
            </label>
            <input
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
              id="username"
              type="text"
              className="login-input-field"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="login-label">
              PASSWORD
            </label>
            <input
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
              id="password"
              type="password"
              className="login-input-field"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {errorMessage !== '' ? (
            <p className="error-message">*{errorMessage}</p>
          ) : null}
        </form>
      </div>
    )
  }
}

export default Login
