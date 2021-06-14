import React, {Component} from 'react';
import './App.css';
import Main from './components/MainComponent';


class App extends Component {
  
  render(){
    return (
      //react application rendered in the page
      <div>
        <div className="App">
          <Main/>
        </div>
      </div>
    )
  };
}

export default App;
