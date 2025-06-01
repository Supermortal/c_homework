import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Flex, View, Heading, ProgressCircle, Text, IllustratedMessage, Button } from '@adobe/react-spectrum';
import { Link } from 'react-router-dom';

const GET_ALL_TASKS = gql`
  query GetAllTasks {
    allTasks {
      id
      title
      description
      status
    }
  }
`;

const TodoList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_TASKS);

  if (loading) {
    return (
      <View marginTop="size-400">
        <ProgressCircle aria-label="Loading…" isIndeterminate />
      </View>
    );
  }

  if (error) {
    return (
      <IllustratedMessage>
        <Heading>Error</Heading>
        <Text>{error.message}</Text>
      </IllustratedMessage>
    );
  }

  return (
    <View width="size-6000">
      <Flex direction="row" justifyContent="end" marginBottom="size-200">
        <Link to="/add" style={{ textDecoration: 'none' }}>
          <Button variant="cta">
            Add Task
          </Button>
        </Link>
      </Flex>
      {data.allTasks.length === 0 ? (
        <IllustratedMessage>
          <Heading>No Tasks</Heading>
          <Text>You have no tasks yet.</Text>
        </IllustratedMessage>
      ) : (
        <Flex direction="column" gap="size-200">
          {data.allTasks.map((task: any) => (
            <View key={task.id} borderWidth="thin" borderColor="gray-300" borderRadius="medium" padding="size-200">
              <Heading level={3}>{task.title}</Heading>
              <Text>{task.description}</Text>
              <Text UNSAFE_style={{ color: task.status === 'Completed' ? 'green' : 'orange' }}>
                Status: {task.status}
              </Text>
            </View>
          ))}
        </Flex>
      )}
      <Flex direction="row" justifyContent="end" marginTop="size-200">
        <Button variant="secondary" onPress={() => refetch()}>
          Refresh
        </Button>
      </Flex>
    </View>
  );
};

export default TodoList;