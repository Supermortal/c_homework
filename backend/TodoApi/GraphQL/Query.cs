using TodoApi.Models;

namespace TodoApi.GraphQL
{
    public class Query
    {
        public IQueryable<TodoTask> AllTasks([Service] TodoDbContext db) => db.Tasks;
    }
}