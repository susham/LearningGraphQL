import {GraphQLServer} from 'graphql-yoga';

const typeDefs = `
type Query {
    hello: String
    }

`

const resolvers = {
    Query:{
        hello(){
            return 'This is my first Query using GraphQL Yoga!!'
        }
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log("The server is up at 4000");
})
console.log("Welcome to Learning GraphQL");

