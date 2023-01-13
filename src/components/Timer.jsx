import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatingTimer, timerUpdate } from '../redux/actions';

class Timer extends Component {
  state = {
    time: 30,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const thirty = 30;
    dispatch(timerUpdate(thirty));
    const thousand = 1000;
    this.interval = setInterval(() => {
      const { timerStopped } = this.props;
      if (timerStopped !== thirty) {
        clearInterval(this.interval);
        this.matchTime();
      }
      this.timerUpdate();
    }, thousand);
  }

  componentDidUpdate() {
    const { time } = this.state;
    if (time === 0) clearInterval(this.interval);
  }

  matchTime = () => {
    const { dispatch } = this.props;
    const { time } = this.state;
    dispatch(timerUpdate(time - 1));
    dispatch(updatingTimer(time));
  };

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

const mapStateToProps = (state) => ({
  timerStopped: state.timerReducer.timerStopped,
});

Timer.propTypes = {
  timerStopped: PropTypes.number,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Timer);
