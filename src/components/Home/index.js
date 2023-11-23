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
    otherDetail: [],
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

      const updatedOtherDetails = [fetchedData.data].map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        location: eachData.location,
      }))

      const updatedData = {
        otherDetails: [fetchedData.data].map(eachData => ({
          id: eachData.id,
          name: eachData.name,
          location: eachData.location,
          chargeCustomers: eachData.charge_customers,
        })),
        amount: [fetchedData.data.amount].map(eachData => ({
          amount_1: eachData.category_6,
          amount_2: eachData.category_7,
          amount_3: eachData.category_8,
          amount_4: eachData.category_9,
          amount_5: eachData.category_10,
        })),
      }
      console.log(updatedData)

      this.setState({
        apiStatus: apiStatusConstants.success,
        otherDetail: updatedOtherDetails,
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
    const {otherDetail} = this.state

    return (
      <ul className="repositories-list">
        {otherDetail.map(eachData => (
          <ReposDetails key={eachData.id} otherReposDetails={eachData} />
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
