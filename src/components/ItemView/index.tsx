import React from 'react';
import { FallingItem, FallingItemShape } from '../../redux/types';
import { CELL_UNIT_SIZE, MIN_WEIGHT_TEXT_SIZE } from '../../redux/constants';

interface FallingItemInGoalLine {
  hasReachedGoalLine?: boolean;
}

export const ItemView: React.FC<
  Omit<FallingItem, 'cellPositionX' | 'cellPositionY' | 'unitTorque'> & FallingItemInGoalLine
> = ({ weight, scaleSize, offsetX, offsetY, itemShape, itemColor, hasReachedGoalLine }) => {
  const weightIndicatorText = <span>{weight}</span>;

  const getItemDivBasedOnShape = (shape: FallingItemShape) => {
    switch (shape) {
      case FallingItemShape.circle:
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: itemColor,
              fontSize: MIN_WEIGHT_TEXT_SIZE,
              borderRadius: '50%',
            }}
          >
            {weightIndicatorText}
          </div>
        );
      case FallingItemShape.rectangle:
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: itemColor,
              fontSize: MIN_WEIGHT_TEXT_SIZE,
            }}
          >
            {weightIndicatorText}
          </div>
        );
      case FallingItemShape.triangle:
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${CELL_UNIT_SIZE / 2}px solid transparent`,
              borderRight: `${CELL_UNIT_SIZE / 2}px solid transparent`,
              borderBottom: `${CELL_UNIT_SIZE}px solid ${itemColor}`,
              fontSize: MIN_WEIGHT_TEXT_SIZE,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: `translate(-50%, -50%)`,
              }}
            >
              {weightIndicatorText}
            </span>
          </div>
        );
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: hasReachedGoalLine ? 'unset' : offsetY,
        bottom: !hasReachedGoalLine ? 'unset' : 0,
        left: offsetX,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: CELL_UNIT_SIZE,
        height: CELL_UNIT_SIZE,
        transform: `scale(${scaleSize})`,
      }}
    >
      {getItemDivBasedOnShape(itemShape)}
    </div>
  );
};

export default ItemView;
