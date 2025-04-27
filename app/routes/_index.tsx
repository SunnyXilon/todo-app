import type { MetaFunction } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { db } from "~/db";
import { todos } from "~/db/schema";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  description: string | null;
  status: "past" | "present" | "future";
  createdAt: string;
  updatedAt: string;
};

type FetcherData = Todo | Todo[] | { success: boolean };

export const meta: MetaFunction = () => {
  return [
    { title: "Todo App" },
    { name: "description", content: "A simple todo app with drag and drop" },
  ];
};

export async function loader() {
  const allTodos = await db.select().from(todos);
  return { todos: allTodos };
}

export default function Index() {
  const { todos: initialTodos } = useLoaderData<typeof loader>();
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [status, setStatus] = useState("present");
  const fetcher = useFetcher<FetcherData>();

  useEffect(() => {
    if (fetcher.data) {
      // Handle different response types
      if (Array.isArray(fetcher.data)) {
        setTodos(fetcher.data);
      } else if ('success' in fetcher.data) {
        // For delete/update operations, refetch all todos
        fetcher.load("/api/todos");
      } else if ('id' in fetcher.data) {
        // For create operation, add the new todo to the list
        setTodos(prev => [...prev, fetcher.data as Todo]);
      }
    }
  }, [fetcher.data]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const formData = new FormData();
      formData.append("intent", "create");
      formData.append("title", newTodo.trim());
      formData.append("status", status);
      fetcher.submit(formData, { method: "post", action: "/api/todos" });
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    const formData = new FormData();
    formData.append("intent", "delete");
    formData.append("id", id.toString());
    fetcher.submit(formData, { method: "post", action: "/api/todos" });
  };

  const handleDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const formData = new FormData();
    formData.append("intent", "update");
    formData.append("id", id);
    formData.append("status", newStatus);
    fetcher.submit(formData, { method: "post", action: "/api/todos" });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Todo List</h1>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
              className="todo-input flex-1 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent"
              placeholder="Add a new todo"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="status-select px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent"
            >
              <option value="present">Present</option>
              <option value="past">Past</option>
              <option value="future">Future</option>
            </select>
            <button
              onClick={handleAddTodo}
              className="todo-button px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Add Todo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["past", "present", "future"].map((status) => (
            <div
              key={status}
              className="column bg-gray-800 rounded-lg p-6 neon-border"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <h2 className="text-xl font-semibold text-white mb-4 text-center capitalize">
                {status}
              </h2>
              <ul className="todo-list min-h-[200px] space-y-3">
                {todos
                  .filter((todo) => todo.status === status)
                  .map((todo) => (
                    <li
                      key={todo.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, todo.id)}
                      className="todo-item bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600 flex items-center justify-between cursor-move hover:shadow-md transition-shadow duration-200"
                    >
                      <span className="flex-1 text-white">{todo.title}</span>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="delete-button ml-4 px-3 py-1 bg-danger text-white rounded hover:bg-red-600 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
