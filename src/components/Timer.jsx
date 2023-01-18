import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateTimer } from '../redux/actions';

function Timer({ time, dispatch }) {
  const thousand = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      const timer = time - 1;
      dispatch(updateTimer(timer));
      console.log(timer);
    }, thousand);
    if (time === 0) clearInterval(interval);
    return () => clearInterval(interval);
  }, [time, dispatch]);

  return (
    <div>
      <span>
        {'Tempo Restante: '}
        { time }
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
