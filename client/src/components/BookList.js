import React, { Component } from "react";

import { graphql } from "react-apollo";
import { getBooksQuery } from "../services/queries";

// components
import BookDetails from "./BookDetails";

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
		};
	}

	displayBooks() {
		let data = this.props.data;
		if (data.loading) {
			return <div>Loading Books</div>;
		} else {
			return data.books.map((book) => {
				return (
					<li
						key={book.id}
						onClick={(e) => {
							this.setState({ selected: book.id });
						}}
					>
						{book.name}
					</li>
				);
			});
		}
	}

	render() {
		return (
			<div>
				<ul id='book-list'>{this.displayBooks()}</ul>
				<BookDetails bookId={this.state.selected} />
			</div>
		);
	}
}

// const BookList = () => {
// 	console.log(getBooksQuery);
// 	return (
// 		<div>
// 			<ul id='book-list'>
// 				<li>Book name</li>
// 			</ul>
// 		</div>
// 	);
// };

export default graphql(getBooksQuery)(BookList);
