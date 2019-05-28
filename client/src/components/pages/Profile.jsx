import React, { Component } from 'react'
import ShowTasks from './ShowTasks'
import axios from 'axios';

export default class Profile extends Component {

  state = {
    tasks: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/myTasks")
      .then(tasksFromServer => {
        console.log("tasksFromServer", tasksFromServer);
        this.setState({ tasks: tasksFromServer.data });
      })
      .catch(err => console.log(err));
  }

  showTasks = () => this.state.tasks.map(task=> <li>{task.activity}</li>)
  
  render() {

    return (
      <div>
        <div>
        Profile page<br/>
        {this.props.user.username}
        {this.props.user.name}
        {this.showTasks()}
        </div>
      </div>
    )
  }
}
