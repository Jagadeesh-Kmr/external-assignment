import {Component} from 'react'

import './index.css'

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
    const {reposDetails} = this.props
    const {name, location} = reposDetails

    return (
      <>
        <li className="repos-list">
          <h1 className="repos-h1">
            {name}, <span>{location}</span>
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
        </li>
      </>
    )
  }
}

export default ReposDetails
