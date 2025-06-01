using HotChocolate;
using TodoApi.Models;
using TodoTask = TodoApi.Models.TodoTask;

namespace TodoApi.GraphQL
{
    public class Mutation
    {
        public TodoTask CreateTask(
            string title,
            string? description,
            string status,
            [Service] TaskRepository repository)
        {
            return repository.Add(title, description, status);
        }

        public TodoTask? UpdateTaskStatus(
            Guid id,
            string status,
            [Service] TaskRepository repository)
        {
            return repository.UpdateStatus(id, status);
        }
    }
}