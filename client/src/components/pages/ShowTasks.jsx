import React, { Component } from "react";
import axios from "axios";
 import api from "../../api";

export default class ShowTasks extends Component {
  state = {
    tasks: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/task")
      .then(tasksFromServer => {
        console.log("tasksFromServer", tasksFromServer);
        this.setState({ tasks: tasksFromServer.data });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps() {
    axios
      .get("http://localhost:5000/api/task")
      .then(tasksFromServer => {
        console.log("tasksFromServer", tasksFromServer);
        this.setState({ tasks: tasksFromServer.data });
      })
      .catch(err => console.log(err));
  }

  deleteTask = (id, i) => {
    console.log(id); //The id in the database
    //Task.deleteById(id)
    axios
      .post("http://localhost:5000/api/task/deleteTaskPlease", { id: id })
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
          <h4>{eachTask.activity}</h4>
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
