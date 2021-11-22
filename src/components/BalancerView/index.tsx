import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectGame } from '../../redux/reducer';
import { TOTTER_LINE_HEIGHT, TOTTER_BALANCER_HEIGHT } from '../../redux/constants';
import ItemView from '../ItemView/index';
import './style.scss';

const BalancerView: React.FC = () => {
  const { doneItems, torque } = useAppSelector(selectGame);

  return (
    <div className="balancerviewcontainer">
      <div
        className="balancerviewline"
        style={{ transform: `rotate(${torque ?? 0}deg)`, height: `${TOTTER_LINE_HEIGHT}px` }}
      >
        <div className="balancerdone">
          {doneItems?.human.map((d, idx) => (
            <ItemView
              // TODO(emrerdem1): You should consider having ID
              //or something equivalent for sorting etc.
              key={idx + d.offsetX + d.offsetY}
              weight={d.weight}
              scaleSize={d.scaleSize}
              offsetX={d.offsetX}
              offsetY={d.offsetY}
              itemShape={d.itemShape}
              itemColor={d.itemColor}
              hasReachedGoalLine={true}
            />
          ))}
        </div>
        <div className="balancerdone">
          {doneItems?.machine.map((d, idx) => (
            <ItemView
              // TODO(emrerdem1): You should consider having ID
              //or something equivalent for sorting etc.
              key={idx + d.offsetX + d.offsetY}
              weight={d.weight}
              scaleSize={d.scaleSize}
              offsetX={d.offsetX}
              offsetY={d.offsetY}
              itemShape={d.itemShape}
              itemColor={d.itemColor}
              hasReachedGoalLine={true}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${TOTTER_BALANCER_HEIGHT / 3}px solid transparent`,
          borderRight: `${TOTTER_BALANCER_HEIGHT / 3}px solid transparent`,
          borderBottom: `${TOTTER_BALANCER_HEIGHT}px solid gray`,
        }}
      ></div>
    </div>
  );
};

export default BalancerView;
