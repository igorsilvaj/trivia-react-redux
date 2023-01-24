import React, { Component } from 'react';

export class Loading extends Component {
  render() {
    return (
      <div className="loadingContainer">
        <div className="loadingElement">
          <div className="loader" />
        </div>
      </div>
    );
  }
}

export default Loading;
