import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import localStrategy from "passport-local";
import expressSession from "express-session";
import { ApolloServer } from "apollo-server-express";
import { AuthenticationError } from "apollo-server-express";

import auth from "./middleware/auth.js";
import User from "./models/User.js";
import authRoute from "./routes/authRoute";
import postRoute from "./routes/postRoute";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers/resolvers";
import getUser from "./helper/getUser";

const app = express();
const PORT = process.env.PORT || 3000;
const cookie_secret = "dsjbfcebsjbjdsfjs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const user = await getUser(token);
    if (!user) throw new AuthenticationError("You Must Logged in");
    return { user };
  },
});
mongoose.connect(
  "mongodb://localhost:27017/backendv2",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongo DB Connected");
  }
);
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};
startServer();
app.use(
  expressSession({
    secret: cookie_secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth().initialize());
//Passport Config
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(authRoute);
app.use(postRoute);
app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
