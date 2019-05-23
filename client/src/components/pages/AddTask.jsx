import React, { Component } from 'react'
import api from '../../api'
import axios from 'axios';
axios.defaults.withCredentials= true;

export default class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity:"",
      type:"",
      participants:""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleClick(e) {
    e.preventDefault()
    console.log(this.state.activity, this.state.participants)
    let data = {
      activity: this.state.activity,
      type: this.state.type,
      participants: this.state.participants
    }
    axios.post('http://localhost:5000/api/saveTask', data).then(dataFromServer=>{
      console.log(dataFromServer)
      //api.addTask(dataFromServer)
      //.then(result => {
        console.log('SUCCESS!', dataFromServer)
        this.setState({
          activity: dataFromServer.data.task,
          type: "",
          participants: "",
          message: `Your task '${this.state.activity}' has been created`
        })
    
    }).catch(err => this.setState({ message: err.toString() }))

    }

  
    render() {
        return (
            <div className="addTask">
              <h2>Add a task</h2>{this.state.activity}
              <form>  
              Activity:     <input type="text" 
                                   value={this.state.activity}
                                   name="activity"
                                   onChange={this.handleInputChange} /> <br />
              type:         <input type="text"
                                   name="type"
                                   onChange={this.handleInputChange} /> <br />
              {/* type:         <input>
                              <select>
                                <option value={this.state.type[0]}>social</option>
                                <option value={this.state.type[1]}>music</option>
                                <option value={this.state.type[2]}>education</option>
                                <option value={this.state.type[3]}>busywork</option>
                                <option value={this.state.type[4]}>charity</option>
                                <option value={this.state.type[5]}>relaxation</option>
                                <option value={this.state.type[6]}>recreational</option>
                                <option value={this.state.type[7]}>cooking</option>
                                <option value={this.state.type[8]}>diy</option>
                              </select>
                            </input> */}
              participants: <input type="number" 
                                   value={this.state.participants} 
                                   name="participants" 
                                   onChange={this.handleInputChange} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Create Task</button>
              </form>
              {this.state.message && <div className="info">
          {this.state.message}
        </div>}
            </div>
        )
    }
}