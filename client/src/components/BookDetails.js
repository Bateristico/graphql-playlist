import React, { Component } from "react";

import { getBookQuery, getBooksQuery } from "../services/queries";
import { graphql } from "react-apollo";

class BookDetails extends Component {
	render() {
		return (
			<div id='book-details'>
				<p>Output book details here</p>
			</div>
		);
	}
}

export default graphql(getBooksQuery)(BookDetails);
