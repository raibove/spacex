
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cards from './components/Cards';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Route exact path="/" component={Cards}/>
       </BrowserRouter>
    </div>
  );
}

export default App;
