import React, { Component } from 'react';

import './App.scss';
import { getFoodListCount } from './contract-connector/connector'

class App extends Component {

  state = {
    foodList: [],
  }


  voterAddressField = React.createRef();
  votingForField = React.createRef();
  pointField = React.createRef();

  componentDidMount() {
    this.loadingFoodList()
  }

  loadingFoodList = async () => {
    const foodList = await getFoodListCount()
    this.setState({
      foodList
    })
  }

  onVote = () => {
    const address = this.voterAddressField.current.value
    const votingFor = this.votingForField.current.value
    const point = this.pointField.current.value

    this.voterAddressField.current.value = null
    this.votingForField.current.value = null
    this.pointField.current.value = null

    console.log('address', address)
    console.log('votingFor', votingFor)
    console.log('point', point)
  }


  renderFoodList = () => {
    const { foodList } = this.state
    return foodList.map((foodItem, index) => {
      return (
        <div key={index} className="detail-item">
          <div className="name">{foodItem.foodName}</div>
          <div className="point">{foodItem.voteCount}</div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <h4>Choose My Lunch</h4>
        <div className="voting-section">
          <input placeholder='Your Address' ref={this.voterAddressField} />
          <input placeholder='Voting for' ref={this.votingForField} />
          <input placeholder='Point' type="number" ref={this.pointField} />
          <button onClick={this.onVote}>Vote</button>
        </div>
        <div className="voting-detail">
          <div className="detail-item header">
            <div className="name">Food Name</div>
            <div className="point">Point</div>
          </div>
          {this.renderFoodList()}
        </div>
        <div></div>
      </div>
    );
  }
}

export default App;
