using System.Collections.Concurrent;

namespace TodoApi.Models
{
    public class TaskRepository
    {
        private readonly ConcurrentDictionary<Guid, TodoTask> _tasks = new();

        public IEnumerable<TodoTask> GetAll() => _tasks.Values;

        public TodoTask Add(string title, string? description, string status)
        {
            var task = new TodoTask
            {
                Id = Guid.NewGuid(),
                Title = title,
                Description = description,
                Status = status
            };
            _tasks[task.Id] = task;
            return task;
        }

        public TodoTask? UpdateStatus(Guid id, string status)
        {
            if (_tasks.TryGetValue(id, out var task))
            {
                task.Status = status;
                return task;
            }
            return null;
        }
    }
}