import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import ProductContextProvider from "./context/productContext";
import UserContextProvider from "./context/userContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

//websocketsוהן ב httpכדי לאפשר תקשורת הן ב
//לצורך כך ניצור שני חיבורים - אחד לכל פרוטוקול
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:8080/graphql',
}));

//ניצור חיבור כחם המאחד את שניהם
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

//אותו נעביר לאובייקט הלקוח לצרוך האזנה לכל סוגי הבקשרות
const client = new ApolloClient({
  link:splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ProductContextProvider>
          <UserContextProvider>
              <Header/>
              <Main/>               
              <Footer/>
          </UserContextProvider>
        </ProductContextProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
