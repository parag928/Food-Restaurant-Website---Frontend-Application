import React, {Component} from 'react';
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  
  render(){
    return (
      //react application rendered in the page
      <BrowserRouter>
        <div>
          <div className="App">
            <Main/>
          </div>
        </div>
      </BrowserRouter>
    )
  };
}

export default App;
