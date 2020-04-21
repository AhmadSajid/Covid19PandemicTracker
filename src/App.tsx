import React from 'react';
import './App.css';

import { Fabric } from 'office-ui-fabric-react';
import PandemicStatsComponent from './components/Dashborad';


function App() {

  return (
    <Fabric className="App">
      <PandemicStatsComponent />
    </Fabric>
  );
}

export default App;
