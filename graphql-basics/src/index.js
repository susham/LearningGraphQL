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

const comments=[
    {
        id:'21',
        text:"This is good post!!!"
    },
    {
        id:'22',
        text:"Very Well Explained!!!"

    },
    
    {
        id:'23',
        text:"Good job!!!"

    }

]

const posts = [{

id:'10',
title: 'GraphQL 101',
body: 'This is how to use GraphQL',
published:true,
author:'1'
},
{
    id:'11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post',
    published:false,
    author:'1'
},
{    
    id:'12',
    title: 'Programming Music',
    body: 'This is how to use GraphQL',
    published:false,
    author:'2'
}]

const typeDefs = `
type Query {
   users(query: String):[User!]!
   posts: [Post!]!
    me: User!
    post:Post!
    comments: [Comment!]!
    }

    type User {
        id:ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post{
        id: ID!
        title: String!
        body: String!
        published:Boolean!
        author: User!
    }

    type Comment{
        id: ID!
        text: String!
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
        },

        posts(){
            return posts
        },
        comments(){
            return comments
        }
    },
    Post:{
        author(parent, args, ctx, info){
            return users.find((user) => {
                console.log(user.id)
                return user.id === parent.author

            })
        }
    },
    User:{
        posts(parent, args, ctx, info){
            return posts.filter((post) => {
                return post.author === parent.id

            })
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

