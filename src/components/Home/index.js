import {Component} from 'react'

import ReposDetails from '../ReposDetails'

import './index.css'

const apiStatusConstants = {
  initial: 'Initial',
  pending: 'pending',
  success: 'Success',
  failure: 'failure',
}

class Home extends Component {
  state = {
    reposData: [],
  }

  componentDidMount() {
    this.getUrlData()
  }

  getUrlData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.pending,
    })
    const url = 'https://stg.dhunjam.in/account/admin/3'
    const response = await fetch(url)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = [fetchedData.data].map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        location: eachData.location,
        chargeCustomers: eachData.charge_customers,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        reposData: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <p>Loading...</p>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {reposData} = this.state

    return (
      <ul className="repositories-list">
        {reposData.map(eachData => (
          <ReposDetails key={eachData.id} reposDetails={eachData} />
        ))}
      </ul>
    )
  }

  renderApiCall = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.pending:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="home-main-container">{this.renderApiCall()}</div>
      </>
    )
  }
}

export default Home
