import {GraphQLServer} from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

let users = [{
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

let comments=[
    {
        id:'21',
        text:"This is good post!!!",
        author:'1',
        post:'10'
    },
    {
        id:'22',
        text:"Very Well Explained!!!",
        author:'1',
        post:'10'

    },
    
    {
        id:'23',
        text:"Good job!!!",
        author:'2',
        post:'11'

    }

]

let posts = [{

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
    
    type Mutation{
        createUser(data:createUserInput): User!
        deleteUser(id: ID!): User!
        createPost(data: createPostInput):Post!
        createComment(data:createCommentInput):Comment!
    }

    input createUserInput{
        name:String!
        email: String!
        age: Int
    }

    input createPostInput{
        title:String!
        body: String! 
        published:Boolean!
        author:ID!
    }

    input createCommentInput{
        text:String!
        author:ID!
        post:ID!
    }


    type User {
        id:ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments:[Comment!]!
    }

    type Post{
        id: ID!
        title: String!
        body: String!
        published:Boolean!
        author: User!
        comments:[Comment]
    }

    type Comment{
        id: ID!
        text: String!
        author:User!
        post: Post!
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
    Mutation:{
        createUser(parent, args, ctx, info){
           const isNewUser = users.some((user) => user.email.match(args.data.email))
           if(isNewUser){
            return new Error("Email Id is already taken!!")
           }
          
           const user ={
               id: uuidv4(),
               ...args.data
           }

           users.push(user)

           return user


        },

        deleteUser(parent, args,ctx,info){
            const userIndex = users.findIndex((user) => {
                return user.id === args.id
            })

            if(userIndex === -1){
                throw new Error('User not found')
            }

            const deletedUsers = users.splice(userIndex,1)
            posts = posts.filter((post) => {
                const match = post.author === args.id
                if(match){
                    //update the comments which are not related to the post
                    comments = comments.filter((comment) => {
                        return comment.post != post.id
                    })
                }
                
                return !match

            })

            comments = comments.filter((comment) => comment.author !== args.id)

            return deletedUser[0]

        },
        createPost(parent,args,ctx, info){
            const userExists = users.some((user) => user.id === args.data.author)

            if(!userExists)
                throw new Error('User not found')
            
            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)
            return post
        },

        createComment(parent,args,ctx,info){
            const userExists = users.some((user) => user.id === args.data.author)

            if(!userExists)
                throw new Error('User not found')
            
            const postExists = posts.some((post) => post.id === args.data.post)

            if(!userExists)
                throw new Error('Post not found')
            
            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)
            return comment
        }
    },
    Post:{
        author(parent, args, ctx, info){
            return users.find((user) => {
                console.log(user.id)
                return user.id === parent.author

            })
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment) => {
                
                return comment.post === parent.id

            })
        }
    },
    User:{
        posts(parent, args, ctx, info){
            return posts.filter((post) => {
                return post.author === parent.id

            })
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment) => {
                return comment.author === parent.id

            })
        }
    },
    Comment:{
        author(parent, args, ctx, infor){
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, infor){
            return posts.find((post) => {
                return post.id === parent.post
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

