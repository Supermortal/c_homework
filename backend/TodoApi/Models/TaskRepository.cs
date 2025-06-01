using System.Collections.Concurrent;

namespace TodoApi.Models
{
    public class TaskRepository
    {
        private readonly ConcurrentDictionary<Guid, Task> _tasks = new();

        public IEnumerable<Task> GetAll() => _tasks.Values;

        public Task Add(string title, string? description, string status)
        {
            var task = new Task
            {
                Id = Guid.NewGuid(),
                Title = title,
                Description = description,
                Status = status
            };
            _tasks[task.Id] = task;
            return task;
        }

        public Task? UpdateStatus(Guid id, string status)
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