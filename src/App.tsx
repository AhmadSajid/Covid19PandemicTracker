import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Fabric, Button, Dialog, IStackTokens, DialogFooter, ButtonType } from 'office-ui-fabric-react';
import PandemicStatsComponent from './components/Dashborad';


function App() {

  const stackTokens: IStackTokens = { childrenGap: 40 };

  return (
    <Fabric className="App">
      <PandemicStatsComponent />
    </Fabric>
  );
}

export default App;
