import React, {Component} from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {ConfigureStore} from '../src/redux/combiner'

const theStore = ConfigureStore();

class App extends Component {
  
  render(){
    return (
      //react application rendered in the page
      <Provider store = {theStore}>
        <BrowserRouter>
          <div>
            <div className="App">
              <Main/>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    )
  };
}

export default App;
