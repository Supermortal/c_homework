using HotChocolate;
using TodoApi.Models;
using TodoTask = TodoApi.Models.TodoTask;

namespace TodoApi.GraphQL
{
    public class Query
    {
        public IEnumerable<TodoTask> GetAllTasks([Service] TaskRepository repository) =>
            repository.GetAll();
    }
}