import {
  MAX_ITEM_WEIGHT,
  HORIZONTAL_CELLS_COUNT,
  SCALE_AMOUNT,
  BASE_SCALE,
  CELL_UNIT_SIZE,
} from './constants';
import { FallingItemShape, MoveDirection } from './types';

export const getRandomItemWeight = (): number => {
  return Math.floor(Math.random() * MAX_ITEM_WEIGHT + 1);
};

export const getRandomFallingItemShape = (): number => {
  return Math.floor((Math.random() * Object.keys(FallingItemShape).length) / 2);
};

export const calculateOffset = (cellPosition: number): number => {
  return CELL_UNIT_SIZE * cellPosition - CELL_UNIT_SIZE;
};

export const getRandomCellPositionX = (): number => {
  return Math.floor(Math.random() * HORIZONTAL_CELLS_COUNT + 1);
};

export const calculateScaleSize = (weight: number): number => {
  return BASE_SCALE + weight * SCALE_AMOUNT;
};

export const getHorizontalPositionAfterMove = (positionX: number, move: MoveDirection): number => {
  switch (move) {
    case MoveDirection.left:
      return positionX - 1;
    case MoveDirection.right:
      return positionX + 1;
    default:
      return positionX;
  }
};

export const getVerticalPositionAfterMove = (positionY: number, move: MoveDirection): number => {
  switch (move) {
    case MoveDirection.bottom:
      return positionY + 1;
    default:
      return positionY;
  }
};

export const calculateTorqueOfFallingItem = (mass: number, distance: number): number => {
  return mass * distance;
};

export const reverseHorizontalCellPosition = (
  maxCount: number,
  currentPosition: number
): number => {
  return maxCount - currentPosition + 1;
};

export const getRandomHexColor = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
