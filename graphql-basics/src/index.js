import {GraphQLServer} from 'graphql-yoga';

const typeDefs = `
type Query {
    greeting(name: String): String!
    hello: String
    me: User!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
    }

    type User {
        id:ID!
        name: String!
        email: String!
        age: Int
    }
`

const resolvers = {
    Query:{

        add(parent, args, ctx, info){
       
            if(args && args.numbers.length === 0)
            return 0


            return args.numbers.reduce((accumulator, currentValue) => {

                return accumulator + currentValue
            })
        },
        greeting(parent, args,ctx, info){
            if(args && args.name)
            return `Hello! ${args.name}`

            return "Hello"
        },
        grades (parent, args, ctx, info) {
            return [10,,34,54]
        },
        hello(){
            return 'This is my first Query using GraphQL Yoga!!'
        },
        me(){
            return{
                id:'123098',
                name: 'Mike',
                email: 'mike@example.com'
               

            }
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

