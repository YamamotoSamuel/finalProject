import React, { Component } from 'react'
import {baseURL} from '../../api'


import axios from 'axios';
axios.defaults.withCredentials= true;
export default class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activity:"",
      type:[],
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
    axios.post(`${baseURL}/saveTask`, data).then(dataFromServer=>{
      console.log(dataFromServer)
      //api.addTask(dataFromServer)
      //.then(result => {
        console.log('SUCCESS!', dataFromServer)
        this.setState({
          activity: dataFromServer.data.task,
          type: [],
          participants: "",
          message: `Your task '${this.state.activity}' has been created`,
          tasks:[]
        })
        this.props.onShowUpdate();
    
    }).catch(err => this.setState({ message: err.toString() }))

    }

    handleMyTask(e) {
      e.preventDefault()
      
      console.log(1111,this.state.activity, this.state.participants)
      let data = {
        activity: this.state.activity,
        type: this.state.type,
        participants: this.state.participants
      }
      axios.post(`${baseURL}/saveMyTask`, data).then(dataFromServer=>{
        console.log(dataFromServer)
          console.log('SUCCESS!', dataFromServer)
          this.props.onShowUpdate();
      
      }).catch(err => this.setState({ message: err.toString() }))
  
      }    
  
    render() {
        return (
            <div className="addTask">
              <h2>Add a Task</h2>
              <form>  
              Activity:     <input type="text" 
                                   value={this.state.activity}
                                   name="activity"
                                   onChange={this.handleInputChange} /> <br />
              type:         <input type="text"
                                   name="type"
                                   onChange={this.handleInputChange} /> <br />
              participants: <input type="number" 
                                   value={this.state.participants} 
                                   name="participants" 
                                   onChange={this.handleInputChange} /> <br />
                <button onClick={(e) => this.handleClick(e)}><b>Add Community Task</b></button><br/>
                <button onClick={(e) => this.handleMyTask(e)}><b>Add Private Task</b></button>

              </form>

              {this.state.message && 
              <div className="info">
                {this.state.message}
              </div>}
            </div>
        )
    }
}