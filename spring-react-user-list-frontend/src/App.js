import React from 'react';
import './App.css';
import Navbar from './layouts/Navbar';
import Users from './components/Users';
import AddUser from './forms/AddUser';
import UpdateUser from './forms/UpdateUser';
import NotFound from './pages/NotFound';
import About from './pages/About';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class App extends React.Component {

	render(){
		return (
			<Router>
				<div className="container">
					<Navbar title="User App" />
					<hr />
					<Switch>
						<Route exact path="/" component={Users} />
						<Route exact path="/add" component={AddUser} />
						<Route exact path="/about" component={About} />
						<Route exact path="/edit/:id" component={UpdateUser} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		);

	}

}

export default App;
