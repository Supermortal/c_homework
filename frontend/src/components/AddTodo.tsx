import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  TextField,
  TextArea,
  Picker,
  Item,
  Button,
  Flex,
  View,
  Heading,
  AlertDialog,
  DialogTrigger
} from '@adobe/react-spectrum';

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String, $status: String!) {
    createTask(title: $title, description: $description, status: $status) {
      id
      title
      description
      status
    }
  }
`;

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    onCompleted: () => navigate('/'),
    onError: (error) => {
      setErrorMsg(error.message);
      setShowError(true);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Title is required.');
      setShowError(true);
      return;
    }
    createTask({ variables: { title, description, status } });
  };

  return (
    <View width="size-6000">
      <Heading level={2}>Add New Task</Heading>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={setTitle}
          isRequired
        />
        <TextArea
          label="Description"
          value={description}
          onChange={setDescription}
        />
        <Picker
          label="Status"
          selectedKey={status}
          onSelectionChange={key => setStatus(key as string)}
        >
          <Item key="Pending">Pending</Item>
          <Item key="Completed">Completed</Item>
        </Picker>
        <Flex direction="row" gap="size-200" marginTop="size-200">
          <Button type="submit" variant="cta" isDisabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
          </Button>
          <Button variant="secondary" onPress={() => navigate('/')}>
            Cancel
          </Button>
        </Flex>
      </Form>
    <DialogTrigger isOpen={showError} onOpenChange={setShowError}>
        <span />
        <AlertDialog
          title="Error"
          variant="error"
          primaryActionLabel="OK"
          onPrimaryAction={() => setShowError(false)}
        >
          {errorMsg}
        </AlertDialog>
      </DialogTrigger>
    </View>
  );
};

export default AddTodo;