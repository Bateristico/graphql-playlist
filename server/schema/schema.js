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
	GraphQLNonNull,
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
				return Author.findById(parent.authorId);
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
				return Book.find({ authorId: parent.id });
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
				return Book.findById(args.id);
			},
		},

		//single author query
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//return _.find(authors, { id: args.id });
				return Author.findById(args.id);
			},
		},

		// book list query
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return books;
				return Book.find({});
			},
		},

		// author list query
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				//return authors;
				return Author.find({});
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				age: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age,
				});
				// save to db
				return author.save();
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				genre: { type: GraphQLNonNull(GraphQLString) },
				authorId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				});
				return book.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});

/* request example
book(id:'2') {
	name,
	genre
}
*/
