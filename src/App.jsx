
import './App.css'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from './components/Success';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  
    return (
      <Router>
        <Switch>
          <Route path="/success" component={Success} />
          <Route path="/error" component={Error} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
  

export default App
