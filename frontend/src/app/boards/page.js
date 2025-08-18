"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ App Router-compatible
import { FiPlusSquare } from "react-icons/fi";

export default function BoardsPage() {
  const router = useRouter();
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // ✅ Redirects to login if not authenticated
      return;
    }

    fetch("http://localhost:5000/api/boards", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBoards(data))
      .catch(() => setError("Failed to load boards"));
  }, [router]);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setBoards([...boards, data]);
      setTitle("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Your Boards</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add Board Form */}
      <form
        onSubmit={handleCreateBoard}
        className="mb-8 w-full max-w-xl flex flex-col sm:flex-row gap-4"
      >
        <input
          type="text"
          placeholder="New Board Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        >
          <FiPlusSquare size={20} /> Create Board
        </button>
      </form>

      {/* Boards Grid */}
      {boards.length === 0 ? (
        <p className="text-gray-500 text-lg mt-6">
          No boards found. Create one to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {boards.map((board) => (
            <div
              key={board._id}
              onClick={() => router.push(`/boards/${board._id}`)}
              className="p-6 bg-white rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {board.title}
              </h2>
              <p className="text-gray-500 text-sm">
                Click to view and manage tasks
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
