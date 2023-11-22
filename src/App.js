// import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import CreateContext from './Context/CreateContext'

import './App.css'

// import LoginForm from './components/LoginForm'
import Home from './components/Home'

class App extends Component {
  state = {
    showImg: true,
  }

  toggleImg = () => {
    this.setState(prevState => ({showImg: !prevState.showImg}))
  }

  render() {
    const {showImg} = this.state
    return (
      <CreateContext.Provider
        value={{
          showImg,
          toggleImg: this.toggleImg,
        }}
      >
        <Home />
      </CreateContext.Provider>
    )
  }
}

export default App
