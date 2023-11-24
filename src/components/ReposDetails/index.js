import {withRouter} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

import Cookies from 'js-cookie'

class ReposDetails extends Component {
  state = {
    inputNum: '',
  }

  onChangeInput = e => {
    const {inputNum} = this.state
    this.setState({
      inputNum: e.target.value,
    })
    console.log(inputNum)
  }

  render() {
    const {otherReposDetails} = this.props
    const {name, location} = otherReposDetails

    const onClickLogout = () => {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    return (
      <>
        <li className="repos-list">
          <h1 className="repos-h1">
            {name},<span> {location}</span>
          </h1>
          <div className="paragraph-container">
            <p className="desc">
              Do you want to charge your customers for requesting songs?
            </p>
            <div className="input-container">
              <input type="radio" value="yes" name="choice" />
              <label htmlFor="yes" className="input-label">
                yes
              </label>
              <input type="radio" value="no" name="choice" />
              <label htmlFor="no" className="input-label">
                no
              </label>
            </div>
          </div>

          <div className="paragraph-container">
            <p className="desc">Custom song request amount-</p>
            <div className="input-container">
              <input
                className="custom-song-input"
                type="text"
                onChange={this.onChangeInput}
              />
            </div>
          </div>

          <div className="paragraph-container">
            <p className="desc">
              Regular song request amounts, from high to low-
            </p>
            <div className="input-container">
              <button type="button">amount</button>
            </div>
          </div>

          <button type="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </>
    )
  }
}

export default withRouter(ReposDetails)
