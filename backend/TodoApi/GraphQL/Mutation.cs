using TodoApi.Models;

namespace TodoApi.GraphQL
{
    public class Mutation
    {
        public async Task<TodoTask> CreateTask(
            string title,
            string? description,
            string status,
            [Service] TodoDbContext db)
        {
            var task = new TodoTask
            {
                Id = Guid.NewGuid(),
                Title = title,
                Description = description,
                Status = status
            };
            db.Tasks.Add(task);
            await db.SaveChangesAsync();
            return task;
        }

        public async Task<TodoTask?> UpdateTaskStatus(
            Guid id,
            string status,
            [Service] TodoDbContext db)
        {
            var task = await db.Tasks.FindAsync(id);
            if (task == null) return null;
            task.Status = status;
            await db.SaveChangesAsync();
            return task;
        }
    }
}