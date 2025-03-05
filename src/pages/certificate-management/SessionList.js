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
      const response = await fetch("http://localhost:3000/api/certificate/get-training-sessions");
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
      const response = await fetch(`http://localhost:3000/api/sessions/${id}`, {
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
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
  {sessions?.map((session) => (
    <div
      key={session._id}
      className="bg-white shadow-md p-6 rounded-lg border w-full max-w-md min-w-[300px]"
    >
      <h3 className="text-xl font-semibold">{session?.station}</h3>
      <p className="text-sm text-gray-600">
        <strong>From:</strong> {session?.sessionDuration?.from} <br />
        <strong>To:</strong> {session?.sessionDuration?.to} <br />
        <strong>Certificate:</strong> {session.certificateType}
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

  {isEditOpen && selectedSession && (
    <EditSessionModal
      session={selectedSession}
      onClose={() => setIsEditOpen(false)}
      onUpdate={(updatedSession) => {
        setSessions(
          sessions.map((s) => (s.id === updatedSession.id ? updatedSession : s))
        );
        setIsEditOpen(false);
      }}
    />
  )}
</div>

  );
};

export default SessionList;
