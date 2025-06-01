using HotChocolate;
using TodoApi.Models;
using Task = TodoApi.Models.Task;

namespace TodoApi.GraphQL
{
    public class Mutation
    {
        public Task CreateTask(
            string title,
            string? description,
            string status,
            [Service] TaskRepository repository)
        {
            return repository.Add(title, description, status);
        }

        public Task? UpdateTaskStatus(
            Guid id,
            string status,
            [Service] TaskRepository repository)
        {
            return repository.UpdateStatus(id, status);
        }
    }
}