import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateTimer } from '../redux/actions';
import iconTimer from '../assets/imgs/iconTimer.png';

function Timer({ time, dispatch }) {
  const thousand = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      const timer = time - 1;
      dispatch(updateTimer(timer));
    }, thousand);
    if (time === 0) clearInterval(interval);
    return () => clearInterval(interval);
  }, [time, dispatch]);

  return (
    <div className="timer">
      <img src={ iconTimer } alt="timer icon" className="timerIcon" />
      <span>
        {'Tempo Restante: '}
        { time }
        {' s'}
      </span>
    </div>
  );
}

const mapStateToProps = (state) => ({
  time: state.timerReducer.timer,
});

Timer.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Timer);
