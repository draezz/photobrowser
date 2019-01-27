import React, { Component } from 'react';
import { CardImg, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

class PhotoDetails extends React.Component {
	state = {
		isLoaded: false,
		activePhoto: []
	};

	// Fetch Photo from API with the ID and store it to the state
	componentDidMount() {
		this.loadPhoto();
	}

	loadPhoto = () => {
		const id = this.props.match.params.id;
		const url = `https://jsonplaceholder.typicode.com/photos/${id}`;
		fetch(url)
			.then((res) => res.json()) //response type
			.then((json) => {
				this.setState({
					isLoaded: true,
					activePhoto: json
				});
			});
	};

	render() {
		const photo = this.state.activePhoto;

		const { isLoaded } = this.state;

		if (!isLoaded) {
			return (
				<div className="App">
					<Spinner style={{ width: '2rem', height: '2rem' }} />
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
