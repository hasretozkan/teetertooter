import React from 'react';
import './App.scss';
import ControllerView from './components/ControllerView/index';
import { PlaygroundView } from './components/PlaygroundView/index';
import Grid from '@mui/material/Grid';

const App: React.FC = () => {
  return (
    <Grid container spacing={2} className="root">
      <Grid item xs={12}>
        <ControllerView />
      </Grid>
      <Grid item xs={12}>
        <PlaygroundView />
      </Grid>
    </Grid>
  );
};

export default App;
