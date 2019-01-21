import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Photos extends Component {
	state = {
		isLoaded: false,
		photos: [],
		per: 15,
		page: 1
	};

	componentDidMount() {
		this.loadPhotos();
	}

	// Fetch Photos from API and store them to state
	loadPhotos = () => {
		const { per, page, photos } = this.state;
		const url = `http://jsonplaceholder.typicode.com/photos?_page=${this.state.page}&_limit=${this.state.per}`;
		fetch(url)
			.then((res) => res.json()) //response type
			.then((json) => {
				this.setState({
					isLoaded: true,
					photos: [ ...photos, ...json ]
				});
			});
	};

	// Pagination
	loadMore = (e) => {
		e.preventDefault();
		this.setState(
			(prevState) => ({
				page: prevState.page + 1
			}),
			this.loadPhotos
		);
	};

	render() {
		const { isLoaded } = this.state;

		if (!isLoaded) {
			return <div className="loading-screen">Loading...</div>;
		} else {
			return (
				<div className="container">
					<div className="col-md-12">
						<div className="row">
							{this.state.photos.map((photo) => (
								<div className="col-md-4" key={photo.id}>
									<Link
										to={{
											pathname: `/photo/${photo.id}`,
											state: { photo: photo.id }
										}}
									>
										<img src={photo.thumbnailUrl} alt={photo.title} />
										<h3>{photo.title}</h3>

										<Button color="danger">Watch Photo Details!</Button>
									</Link>
								</div>
							))}
							<h3 onClick={this.loadMore}>
								<i>Show More Photos</i>
							</h3>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Photos;
