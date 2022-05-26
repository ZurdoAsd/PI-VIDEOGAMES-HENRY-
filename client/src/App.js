import './App.css';
import {Route, Switch} from "react-router-dom"
import Home from "./components/Home";
import Landing from "./components/Landing.jsx";
import Details from "./components/Details.jsx";
import Create from "./components/Create.jsx"
function App() {
  return (
    <div className="App">
     <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/:id" component={Details}/>
        <Route exact path="/create" component={Create}/>
        <Route path="*" component={Create}/>
      </Switch>
    </div>
  );
}

export default App;
