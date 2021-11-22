import React from 'react';
import StatisticsView from '../StatisticsView/index';
import GameBoardView from '../GameBoardView/index';
import './style.scss';
import Grid from '@mui/material/Grid';

export const PlaygroundView: React.FC = () => {
  return (
    <div className="playgroundcontainer">
      <div style={{ width: '100%' }}>
        <StatisticsView />
      </div>
      <Grid item xs={12}>
        <GameBoardView />
      </Grid>
    </div>
  );
};

export default PlaygroundView;
