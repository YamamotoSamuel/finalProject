import React, { Component } from "react";
import axios from "axios";
import { baseURL } from '../../api'
axios.defaults.withCredentials= true;

export default class ShowTasks extends Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    axios
      .get(`${baseURL}/task`)
      .then(tasksFromServer => {
        console.log("tasksFromServer", tasksFromServer);
        this.setState({ tasks: tasksFromServer.data });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps() {
    axios
      .get(`${baseURL}/task`)
      .then(tasksFromServer => {
        console.log("tasksFromServer", tasksFromServer);
        this.setState({ tasks: tasksFromServer.data });
      })
      .catch(err => console.log(err));
  }

  deleteTask = (id, i) => {
    console.log(id); //The id in the database
    axios
      .post(`${baseURL}/taskdeleteTaskPlease`, { id: id })
      .then(responseFromServer => {
        console.log(responseFromServer);
        let tasks = [...this.state.tasks];
        tasks.splice(i, 1);
        this.setState({ tasks });
      });
  };

  showTheTasks = () => {
    return this.state.tasks.map((eachTask, i) => {
      return (
        <li>
          <h4>{eachTask.activity} - {eachTask.type}</h4>
          {/* {this.props.user? (
            <button onClick={() => this.deleteTask(eachTask._id, i)}>
              Delete
            </button>
          ) : (
            ""
          )} */}
        </li>
      );
    });
  };

  render() {
    return <div>{this.showTheTasks()}</div>;
  }
}
