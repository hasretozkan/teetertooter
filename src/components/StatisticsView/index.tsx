import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectGame } from '../../redux/reducer';
import { FallingItem } from '../../redux/types';
import './style.scss';

const getTotalWeightPerSide = (fallingList: FallingItem[]) =>
  fallingList.map((item) => item.unitTorque).reduce((acc, curr) => acc + curr);

export const StatisticsView: React.FC = () => {
  const { doneItems } = useAppSelector(selectGame);
  let humanWeight = 0;
  let machineWeight = 0;

  if (doneItems.human.length && doneItems.machine.length) {
    humanWeight = getTotalWeightPerSide(doneItems.human);
    machineWeight = getTotalWeightPerSide(doneItems.machine);
  }

  return (
    <div className="statisticsContainer">
      <div className="statisticsItem">
        <span>Humanity</span>
        <p>Total weight: {humanWeight}</p>
      </div>
      <div className="statisticsItem">
        <span>Skynet</span>
        <p>Total weight: {machineWeight}</p>
      </div>
    </div>
  );
};

export default StatisticsView;
