"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
 

export default function ActivityLog() {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/activities", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivities();
  }, [user]);

  return (
    <div className="bg-white shadow rounded p-4 max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Activity Log</h2>
      {activities.length === 0 ? (
        <p className="text-gray-500">No activity yet.</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((act) => (
            <li key={act._id} className="border-b pb-1">
              <p className="text-gray-700">{act.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(act.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
