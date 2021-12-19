import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import User from './User';
import Posts from './Posts';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/user' component={User} />
        <Route exact path='/posts' component={Posts} />
      </Switch>
    </Router>
  );
}

export default App;
