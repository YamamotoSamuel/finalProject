import React, { Component } from 'react'
import axios from 'axios';

export default class GenerateTask extends Component {
  state={
    task:{}
  }
  componentDidMount(){
    axios.get('https://www.boredapi.com/api/activity')
    .then(theTask => {
      this.setState ({
        task: theTask.data
      })
    })
  }
  render() {
    return (
      <div className="Task">
        {/* details */}
        {this.props.match.params.id}
        <h1>{this.state.task.activity}</h1>
        <h2>{this.state.task.type}</h2>
      </div>
    )
  }
}
