import AddJob from './Component/AddJob';
import Content from './Component/Content';
import './App.css';
import { useContext } from 'react';
import { Context } from './Component/Provider';

function App() {
  var [state] = useContext(Context)
  var {isShowAdding, isShowEditing} = state 
  return (
      <div className="App">
          <div className="row">
            <div className={isShowAdding || isShowEditing?'col-lg-4':'d-lg-none'}>
              <AddJob/>
            </div>
            <div className={isShowAdding || isShowEditing?'col-lg-8':'col-lg-12'}>
              <Content/>
            </div>
          </div>
      </div>
  );
}

export default App;
