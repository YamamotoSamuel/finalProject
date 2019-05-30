import React, { Component } from 'react'
import axios from 'axios';
import api from '../../api'
import { baseURL } from '../../api'
axios.defaults.withCredentials= true;

export default class Profile extends Component {

  state = {
    tasks: [],
    user: {},
    
  };

  deleteTask = (id, i) => {
    console.log(id);
    axios
      .post(`${baseURL}/task/deleteTaskPlease`, { id: id })
      .then(responseFromServer => {
        console.log(responseFromServer);
        let tasks = [...this.state.tasks];
        tasks.splice(i, 1);
        this.setState({ tasks });
      });
  };

  componentDidMount() {
    this.showUser()
    axios
      .get(`${baseURL}/myTasks`)
      .then(tasksFromServer => {
        console.log("tasksFromServer", tasksFromServer);
        this.setState({ tasks: tasksFromServer.data });
      })
      .catch(err => console.log(err));
  }

  showUser = () => {
    console.log(api.getLocalStorageUser())

    this.setState({
      user: api.getLocalStorageUser()
    });
  }

  showTasks = () => {
    return this.state.tasks.map((task, i) => {
      return (
        <li>
          <h4>{task.activity} - {task.type}</h4>
          {this.props.user? (
            <button onClick={() => this.deleteTask(task._id, i)}>
              Delete
            </button>
          ) : (
            ""
          )}
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <div>
        <h1>{this.state.user.name}'s profile page</h1>
        <h2>Username: {this.state.user.username}</h2>
        </div>
        <div className="Private-Tasks">
        {this.showTasks()}
        </div>
      </div>
    )
  }
}