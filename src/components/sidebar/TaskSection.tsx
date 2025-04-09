
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { Task } from './types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const TaskSection = ({ collapsed }: { collapsed: boolean }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const { toast } = useToast();

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: crypto.randomUUID(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
    toast({
      title: "Task created",
      description: "Your task has been added to the list."
    });
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Your task has been removed from the list."
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  if (collapsed) {
    return (
      <div className="px-4 py-2 mt-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-full flex justify-center"
          title="Tasks (collapsed)"
        >
          <CheckCircle2 className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-2 mt-4">
      <h3 className="text-xs font-medium text-electron-text-muted mb-2">DAILY TASKS</h3>
      
      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="h-8 text-sm"
        />
        <Button 
          size="icon" 
          className="h-8 w-8" 
          onClick={addTask}
          title="Add task"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={cn(
              "flex items-center justify-between p-2 rounded-md text-sm",
              task.completed ? "bg-electron-item/20" : "bg-electron-hover"
            )}
          >
            <div className="flex items-center space-x-2 flex-1 overflow-hidden">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskStatus(task.id)}
                className="h-4 w-4"
              />
              <span 
                className={cn(
                  "truncate", 
                  task.completed && "line-through text-electron-text-muted"
                )}
              >
                {task.text}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-2 text-electron-text-muted hover:text-destructive"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-xs text-electron-text-muted py-4 text-center italic">
            No tasks yet. Add one above!
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSection;
