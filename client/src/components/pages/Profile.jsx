import React, { Component } from 'react'
import ShowTasks from './ShowTasks'

export default class Profile extends Component {
  render() {
    return (
      <div>
        <div>
        Profile page<br/>
        {this.props.user.username}
        {this.props.user.name}
        </div>
        <div className="show-user-tasks">
          <ShowTasks />
        </div>
      </div>
    )
  }
}
