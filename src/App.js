import React from 'react';
import NavBarContainer from './containers/NavBarContainer';

import './App.scss';

const App = () => {
  // sample data
  let university = {
    fullName: "Queensland University of Technology",
    smallName: "QUT",
  }


  return (
    <div>
      {/* <NavBarContainer university={university} /> */}
      <NavBarContainer />
      <div className="px-5">

      </div>
    </div>
  );
}

export default App;
