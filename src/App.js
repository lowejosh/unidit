import React from 'react';
import NavBarContainer from './containers/NavBarContainer';
import Content from './containers/Content';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
library.add(faAddressBook)

const App = () => {

  return (
    <div>
      <NavBarContainer />

      <div style={{marginLeft: "10rem", marginRight: "10rem", marginTop: "2rem"}}>
        <Content />
      </div>
    </div>
  );
}

export default App;
