import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Welcome from './layout/Welcome';
import Departement from './departement/ListDepartement';
import Entreprise from './entreprise/Entreprise';
import AddDepartement from './departement/AddDepartement';
import UpdateDepartement from './departement/UpdateDepartement';

function RouterComponent() {
    return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="container">
        <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/dep" component={Departement} />
            <Route exact path="/add-dep" component={AddDepartement} />
            <Route exact path="/edit-dep" component={UpdateDepartement} />
            <Route exact path="/entreprise" component={Entreprise} />
            <Route component={NoMatch} />
        </Switch>
      </div>
      <Footer />
    </div>
    </Router>
    )
}

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}


export default RouterComponent;

