"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function BoardDetailsPage() {
  const { id } = useParams(); // ✅ App Router way
  const router = useRouter();
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState({});
  const [listTitle, setListTitle] = useState("");
  const [activityLogs, setActivityLogs] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (id) {
      fetchLists();
      fetchActivityLogs();
    }
  }, [id]);

  const fetchLists = async () => {
    const res = await fetch(`http://localhost:5000/api/lists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setLists(Array.isArray(data) ? data : []);
    data.forEach((list) => fetchTasks(list._id));
  };

  const fetchTasks = async (listId) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${listId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTasks((prev) => ({ ...prev, [listId]: Array.isArray(data) ? data : [] }));
  };

  const fetchActivityLogs = async () => {
    const res = await fetch(`http://localhost:5000/api/activity/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setActivityLogs(
      Array.isArray(data)
        ? data.map((log) => ({
            message: log.message,
            timestamp: new Date(log.timestamp).toLocaleString(),
          }))
        : []
    );
  };

  const addActivityLog = async (message) => {
    setActivityLogs((prev) => [
      { message, timestamp: new Date().toLocaleString() },
      ...prev,
    ]);

    await fetch("http://localhost:5000/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ boardId: id, message }),
    });
  };

  const createList = async (e) => {
    e.preventDefault();
    if (!listTitle.trim()) return;
    const res = await fetch("http://localhost:5000/api/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: listTitle, boardId: id }),
    });
    if (res.ok) {
      const data = await res.json();
      setListTitle("");
      fetchLists();
      addActivityLog(`Created list: "${data.title}"`);
    }
  };

  const createTask = async (listId) => {
    if (!newTask[listId]) return;
    const res = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTask[listId], listId }),
    });
    if (res.ok) {
      const data = await res.json();
      setNewTask((prev) => ({ ...prev, [listId]: "" }));
      fetchTasks(listId);
      addActivityLog(
        `Added task: "${data.title}" to list "${lists.find((l) => l._id === listId)?.title}"`
      );
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceTasks = Array.from(tasks[source.droppableId]);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      const destTasks = Array.from(tasks[destination.droppableId] || []);
      movedTask.listId = destination.droppableId;
      destTasks.splice(destination.index, 0, movedTask);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destTasks,
      });

      addActivityLog(
        `Moved task: "${movedTask.title}" from "${lists.find((l) => l._id === source.droppableId)?.title}" to "${lists.find((l) => l._id === destination.droppableId)?.title}"`
      );
    } else {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks({ ...tasks, [source.droppableId]: sourceTasks });
    }

    await fetch(`http://localhost:5000/api/tasks/${draggableId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ listId: movedTask.listId }),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6 flex flex-col lg:flex-row gap-6">
      {/* Main Board Section */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">Lists & Tasks</h1>

        {/* Add List */}
        <form onSubmit={createList} className="mb-6 flex gap-2">
          <input
            type="text"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            placeholder="List title"
            className="border p-2 rounded flex-1"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add List
          </button>
        </form>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 overflow-x-auto">
            {lists.map((list) => (
              <Droppable droppableId={list._id} key={list._id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-blue-100 p-4 rounded shadow min-w-[250px]"
                  >
                    <h2 className="font-bold mb-2">{list.title}</h2>

                    {(tasks[list._id] || []).map((task, index) => (
                      <Draggable draggableId={task._id} index={index} key={task._id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-2 mb-2 rounded shadow cursor-pointer"
                          >
                            {task.title}
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}

                    <div className="flex mt-2">
                      <input
                        type="text"
                        placeholder="Task title"
                        value={newTask[list._id] || ""}
                        onChange={(e) =>
                          setNewTask((prev) => ({ ...prev, [list._id]: e.target.value }))
                        }
                        className="border p-2 rounded-l w-full"
                      />
                      <button
                        onClick={() => createTask(list._id)}
                        className="bg-green-500 text-white px-3 rounded-r hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Activity Logs */}
      <div className="w-full lg:w-1/4 bg-white shadow rounded p-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2">Activity Logs</h2>
        {activityLogs.length === 0 ? (
          <p className="text-gray-500">No activities yet.</p>
        ) : (
          <ul className="space-y-2">
            {activityLogs.map((log, index) => (
              <li key={index} className="text-sm text-gray-700">
                <span className="block">{log.message}</span>
                <span className="block text-xs text-gray-400">{log.timestamp}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
