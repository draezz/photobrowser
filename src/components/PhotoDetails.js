import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PhotoDetails extends React.Component {
	state = {
		activePhoto: []
	};

	// Fetch Photos from API and store them to state
	componentDidMount = async () => {
		const id = this.props.match.params.id;
		const req = await fetch(`http://jsonplaceholder.typicode.com/photos/${id}`);

		const response = await req.json();
		this.setState({
			activePhoto: response
		});
	};

	render() {
		const photo = this.state.activePhoto;
		return (
			<div className="photo-details">
				<img src={photo.url} /> <h3> {photo.title} </h3>
				<Link to={'/'} title="Return to photos page">
					Return back to photos
				</Link>
			</div>
		);
	}
}

export default PhotoDetails;
