import React, { Component } from 'react';
import Photos from './components/Photos';
import './App.css';
import PhotoDetails from './components/PhotoDetails';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Photos />
			</div>
		);
	}
}

export default App;
