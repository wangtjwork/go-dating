import React, { Component } from 'react';

class CustomErrorPage extends Component {
  render() {
    return (
      <div>{ this.props.errorInfo }</div>  
    )
  }
}

export default CustomErrorPage
