import React, { Component } from 'react'
import axios from 'axios';

export default class PrivateTasks extends Component {
  state={
    privTasks: []
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/task")
      .then(privTasksFromServer => {
        console.log("privTasksFromServer", privTasksFromServer);
        this.setState({ privTasks: privTasksFromServer.data });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps() {
    axios
      .get("http://localhost:5000/api/task")
      .then(privTasksFromServer => {
        console.log("privTasksFromServer", privTasksFromServer);
        this.setState({ privTasks: privTasksFromServer.data });
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
        let privTasks = [...this.state.privTasks];
        privTasks.splice(i, 1);
        this.setState({ privTasks });
      });
  };

  showThePrivTasks = () => {
    return this.state.privTasks.map((eachPrivTask, i) => {
      return (
        <li>
          {eachPrivTask.activity}
          {this.props.user? (
            <button onClick={() => this.deleteTask(eachPrivTask._id, i)}>
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
    return <div>{this.showThePrivTasks()}</div>;
  }
}


//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }
