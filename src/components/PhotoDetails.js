import React, { Component } from 'react';
import { CardImg, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

class PhotoDetails extends React.Component {
	state = {
		isLoaded: false,
		activePhoto: []
	};

	// Fetch Photos from API and store them to state
	componentDidMount = async () => {
		const id = this.props.match.params.id;
		const req = await fetch(`http://jsonplaceholder.typicode.com/photos/${id}`);

		const response = await req.json();
		this.setState({
			isLoaded: true,
			activePhoto: response
		});
	};

	render() {
		const photo = this.state.activePhoto;

		const { isLoaded } = this.state;

		if (!isLoaded) {
			return (
				<div className="App">
					<Spinner style={{ width: '3rem', height: '3rem' }} />
				</div>
			);
		} else {
			return (
				<div className="photo-details">
					<div className="container">
						<div className="col-md-12">
							<div className="row">
								<div className="col-md-6">
									<CardImg src={photo.url} alt={photo.title} />
								</div>

								<div className="col-md-6">
									<h1>{photo.title}</h1>
									<p>ID: {photo.id}</p>

									<Link to={'/'} title="Return to photos">
										<button className="btn btn-primary">Return to photos</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default PhotoDetails;
