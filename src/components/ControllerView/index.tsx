import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectGame,
  startNewGame,
  startNewRound,
  toggleCurrentGameFlow,
} from '../../redux/reducer';
import Button from '@mui/material/Button';
import './style.scss';

export const ControllerView: React.FC = () => {
  const { isStopped, isStarted, isFinished } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();

  const invokeNewGame = () => {
    dispatch(startNewGame());
    dispatch(startNewRound());
  };
  const handleGameFlow = () => {
    dispatch(toggleCurrentGameFlow());
  };

  return (
    <div className="controller">
      <Button style={{ margin: 10, width: '100%' }} onClick={invokeNewGame} variant="contained">
        New game
      </Button>
      <Button
        style={{ margin: 10, width: '100%' }}
        onClick={handleGameFlow}
        variant="contained"
        disabled={!isStarted || isFinished}
      >
        {isStopped ? 'Continue' : 'Stop'}
      </Button>
    </div>
  );
};

export default ControllerView;
