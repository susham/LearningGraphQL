import {GraphQLServer} from 'graphql-yoga';


const users = [{
    id:'1',
    name: "Susham",
    email:"test@test.com"
},
{
id:'2',
name: "SYerabolu",
email:"test@test1.com"
}
]

const typeDefs = `
type Query {
   users(query: String):[User!]!
    me: User!
  
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

        users(parent, args, ctx, info){
            if(args && args.query){
                return users.filter((user) => {
                    return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
                })
            }

            return users;


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

