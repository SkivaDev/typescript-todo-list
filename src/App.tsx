import React, { useRef, useState } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const addTask = (name: string) => {
    const newTasks = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const onChange = (e: any) => {
    console.log(e.target.value);
    setNewTask(e.target.value);
  };

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const toggleDoneTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const removeTask = (i: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Tasks ReactTs</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={onChange}
                  value={newTask}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">save</button>
              </form>
              {tasks.map((t: ITask, i: number) => {
                return (
                  <div className="card card-body mt-2" key={i}>
                    <h2 style={{
                      textDecoration: t.done ? "line-through" : "none"
                      }}>
                        {t.name}
                      </h2>
                    <div>
                      <button className="btn btn-secondary" onClick={() => toggleDoneTask(i)}>
                        {t.done ? "✓" : "✗"}
                      </button>
                      <button className="btn btn-danger" onClick={() => removeTask(i)}>
                        🗑
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
