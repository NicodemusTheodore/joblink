const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: bookTypeDefs,
  resolvers: bookResolvers,
} = require("./schemas/book");
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");
const {
  typeDefs: jobTypeDefs,
  resolvers: jobResolvers,
} = require("./schemas/job");

const server = new ApolloServer({
  typeDefs: [bookTypeDefs, userTypeDefs, jobTypeDefs],
  resolvers: [bookResolvers, userResolvers, jobResolvers],
});

(async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 10000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log(error);
  }
})();
