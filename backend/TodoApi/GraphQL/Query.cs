using HotChocolate;
using TodoApi.Models;
using Task = TodoApi.Models.Task;

namespace TodoApi.GraphQL
{
    public class Query
    {
        public IEnumerable<Task> GetAllTasks([Service] TaskRepository repository) =>
            repository.GetAll();
    }
}