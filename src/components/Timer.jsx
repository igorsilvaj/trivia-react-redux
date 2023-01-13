import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatingTimer } from '../redux/actions';

class Timer extends Component {
  state = {
    time: 30,
  };

  componentDidMount() {
    const thousand = 1000;
    this.interval = setInterval(() => {
      this.timerUpdate();
    }, thousand);
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time === 0) clearInterval(this.interval);
  }

  timerUpdate = () => {
    const { time } = this.state;
    const { dispatch } = this.props;
    const newTime = time - 1;
    this.setState({ time: newTime }, () => { dispatch(updatingTimer(newTime)); });
  };

  render() {
    const { time } = this.state;
    return (
      <div>{ time }</div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
