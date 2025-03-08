import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import EditSessionModal from "./EditSessionModal";

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch(`${window.Configs.backendUrl}/certificate/get-training-sessions`);
      const data = await response.json();
      console.log(data.data.trainingSessionList);
      setSessions(data?.data?.trainingSessionList);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const handleEdit = (session) => {
    setSelectedSession(session);
    setIsEditOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${window.Configs.backendUrl}/sessions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSessions(sessions.filter((session) => session.id !== id));
      } else {
        console.error("Failed to delete session");
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-y-6 p-6">
  {sessions?.map((session, index) => (
    <div
      key={session._id}
      className={`bg-white shadow-md p-6 rounded-lg border w-full min-w-[300px] max-w-[400px] flex flex-col justify-between ${
        (index + 1) % 3 !== 0 ? "mr-6" : "" // Add margin except for the last item in a row
      }`}
    >
      <h3 className="text-xl font-semibold">{session?.station}</h3>
      <p className="text-sm text-gray-600">
        <strong>From:</strong> { session?.sessionDuration?.from } <br />
        <strong>To:</strong> { session?.sessionDuration?.to } <br />
        <strong>Certificate:</strong> { session?.certificateType?.name }
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => handleEdit(session)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(session.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>



  );
};

export default SessionList;
