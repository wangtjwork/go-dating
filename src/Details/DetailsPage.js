import React, { Component } from 'react'

class DetailsPage extends Component {
  render() {
    return (
      <div>{this.props.place[0]}</div>
    )
  }
}

export default DetailsPage
