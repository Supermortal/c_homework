import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, defaultTheme, Heading, Flex, View } from '@adobe/react-spectrum';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider theme={defaultTheme} colorScheme="light">
        <View padding="size-200">
          <Flex direction="column" gap="size-200" alignItems="center">
            <Heading level={1}>Todo Task Manager</Heading>
            <Router>
              <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/add" element={<AddTodo />} />
              </Routes>
            </Router>
          </Flex>
        </View>
      </Provider>
    </ApolloProvider>
  );
};

export default App;