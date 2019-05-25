import React, { Component } from "react";
import axios from "axios";
import AddTask from "./AddTask";
import ShowTasks from "./ShowTasks";
axios.defaults.withCredentials = true;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      tasks: [],
      refreshShow: false
      // checked: false
    };
  }

  handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked });
  componentDidMount() {}
  getActivity = () => {
    console.log("getting activity");
    axios
      .get("https://www.boredapi.com/api/activity", { withCredentials: false })
      .then(theTask => {
        console.log("the task is", theTask);
        this.setState({
          // task: [{theTask.activity},{theTask.type},{theTask.particpants}]
          //task: [theTask.data.activity,theTask.data.type,theTask.data.participants]
          task: theTask.data
        });
      });
  };

  componentWillReceiveProps() {
    this.onShowUpdate();
  }

  onShowUpdate = e => {
    let status = !this.state.refreshShow;
    this.setState({ refreshShow: status });
  };

  render() {
    return (
      <div className="Home">
        <div className="Add-Task">
          <AddTask onShowUpdate={this.onShowUpdate} />
        </div>
        <div className="generate-task">
          <h1>Get a Random Activity!</h1>
          <i>Activity:</i>
          <h2>{this.state.task.activity}</h2>
          <br />
          <i>Type:</i>
          <h2>{this.state.task.type}</h2>
          <br />
          <i>Recommended participants:</i>
          <h2>{this.state.task.participants}</h2>

          <button className="give-task" onClick={this.getActivity}>
            Generate
          </button>
        </div>
        <div className="community-tasks">
          <h2>Community Added Activities</h2>
          <ShowTasks
            refreshShow={this.state.refreshShow}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}
