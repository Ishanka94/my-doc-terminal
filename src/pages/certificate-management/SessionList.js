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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {sessions?.map((session) => (
        <div key={session._id} className="bg-white shadow-md p-4 rounded-lg border">
          <h3 className="text-lg font-semibold">{session?.station}</h3>
          <p className="text-sm text-gray-600">
            <strong>From:</strong> {session?.sessionDuration?.from} <br />
            <strong>To:</strong> {session?.sessionDuration?.to} <br />
            <strong>Certificate:</strong> {session.certificateType}
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => handleEdit(session)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(session.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
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
