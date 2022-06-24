const resolvers = {
  Query: {
    hello: (_, args, context) => context.user,
  },
};

export default resolvers;
