import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { move, autoMove, selectGame, startNewRound, saveCurrentRound } from '../../redux/reducer';
import { MoveDirection } from '../../redux/types';
import {
  HORIZONTAL_CELLS_COUNT,
  VERTICAL_CELLS_COUNT,
  CELL_UNIT_SIZE,
} from '../../redux/constants';
import BalancerView from '../BalancerView/index';

import ItemView from '../ItemView/index';
import './style.scss';

const BOARD_WIDTH = CELL_UNIT_SIZE * HORIZONTAL_CELLS_COUNT * 2;
const BOARD_HEIGHT = CELL_UNIT_SIZE * VERTICAL_CELLS_COUNT;

const GameBoardView: React.FC = () => {
  const { isStarted, isStopped, isFinished, hasReachedGoalLine, speedLevel, ongoingItems } =
    useAppSelector(selectGame);
  const dispatch = useAppDispatch();
  const fallingItemRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fallingItemRef && fallingItemRef.current) {
      fallingItemRef.current.focus();
    }
  }, [ongoingItems]);

  useEffect(() => {
    if (!hasReachedGoalLine) {
      return;
    }

    dispatch(saveCurrentRound());
    dispatch(startNewRound());
  }, [hasReachedGoalLine, dispatch]);

  useEffect(() => {
    if (isStarted && !isStopped && !hasReachedGoalLine) {
      const timedMovement = setInterval(() => {
        dispatch(autoMove(MoveDirection.bottom));
      }, 1000 / speedLevel);
      return () => clearInterval(timedMovement);
    }
  }, [isStarted, isStopped, hasReachedGoalLine, dispatch, speedLevel]);

  const handleMovement = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (!ongoingItems || isStopped || isFinished) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        if (!hasReachedGoalLine) {
          return dispatch(move(MoveDirection.bottom));
        }
        break;
      case 'ArrowLeft':
        if (ongoingItems.human.cellPositionX > 1) {
          return dispatch(move(MoveDirection.left));
        }
        break;
      case 'ArrowRight':
        if (ongoingItems.human.cellPositionX < HORIZONTAL_CELLS_COUNT) {
          return dispatch(move(MoveDirection.right));
        }
        break;
      default:
        return;
    }
  };

  // User should be able to have control when the board is clicked.
  const handleFocus = () => {
    if (fallingItemRef && fallingItemRef.current) {
      fallingItemRef.current.focus();
    }
  };

  return (
    <div
      style={{
        width: `${BOARD_WIDTH}px`,
        height: `${BOARD_HEIGHT}px`,
        display: 'flex',
        position: 'relative',
        flexWrap: 'wrap',
      }}
      onClick={handleFocus}
    >
      {isFinished && <div className="gameoverlay">Game over.</div>}
      {isStopped && <div className="gameoverlay">Paused.</div>}
      <div className="itemviewcontainer">
        {ongoingItems?.human && (
          // tabIndex is needed to receive key down events.
          <span onKeyDown={handleMovement} ref={fallingItemRef} tabIndex={0}>
            <ItemView
              weight={ongoingItems.human.weight}
              scaleSize={ongoingItems.human.scaleSize}
              offsetX={ongoingItems.human.offsetX}
              offsetY={ongoingItems.human.offsetY}
              itemShape={ongoingItems.human.itemShape}
              itemColor={ongoingItems.human.itemColor}
            />
          </span>
        )}
      </div>
      <div className="itemviewcontainer">
        {ongoingItems?.machine && (
          <ItemView
            weight={ongoingItems.machine.weight}
            scaleSize={ongoingItems.machine.scaleSize}
            offsetX={ongoingItems.machine.offsetX}
            offsetY={ongoingItems.machine.offsetY}
            itemShape={ongoingItems.machine.itemShape}
            itemColor={ongoingItems.machine.itemColor}
          />
        )}
      </div>
      <BalancerView />
    </div>
  );
};

export default GameBoardView;
