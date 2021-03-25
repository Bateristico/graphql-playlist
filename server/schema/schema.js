const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
} = graphql;

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				//return _.find(authors, { id: parent.authorId });
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return _.filter(books, { authorId: parent.id });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		//single book query
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get the data from the db / other source
				// using lodash
				//return _.find(books, { id: args.id });
			},
		},

		//single author query
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//return _.find(authors, { id: args.id });
			},
		},

		// book list query
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return books;
			},
		},

		// author list query
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				//return authors;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});

/* request example
book(id:'2') {
	name,
	genre
}
*/
