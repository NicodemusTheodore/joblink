import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://joblink.nicodemustheodore.my.id",
  cache: new InMemoryCache(),
});

export default client;
