import React, { Component } from 'react';
import Axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: ''
    }
  }
  componentDidMount(){
     
  }
  getActivity = () => {
    Axios.get('https://www.boredapi.com/api/activity')
    .then(theTask => {
      console.log(theTask,123412342134,Date.now())
      this.setState ({
        task: theTask.data.activity
      })
    })
  }
  render() {                
    return (
      <div className="Home">
        <h2>Home</h2>
        <p>This is my final project with the MERN stack</p>
        {this.state.task}<br />
        <button className="give-task" onClick={this.getActivity}>Get a Random Activity</button>
      </div>
    );
  }
}
