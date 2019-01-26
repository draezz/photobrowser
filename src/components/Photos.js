import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, Button, Spinner } from 'reactstrap';
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
			return <Spinner style={{ width: '3rem', height: '3rem' }} />;
		} else {
			return (
				<div className="container">
					<div className="col-md-12">
						<h1>Photo Browser App</h1>
						<div className="row">
							{this.state.photos.map((photo) => (
								<div className="col-md-4 photos" key={photo.id}>
									<Card>
										<Link
											to={{
												pathname: `/photo/${photo.id}`,
												state: { photo: photo.id }
											}}
										>
											<CardImg top width="100%" src={photo.thumbnailUrl} alt={photo.title} />
											<CardBody>
												<CardTitle>{photo.title}</CardTitle>
											</CardBody>
										</Link>
									</Card>
								</div>
							))}
							<div className="load-more">
								<button onClick={this.loadMore} className="btn btn-primary">
									Show More Photos
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Photos;
