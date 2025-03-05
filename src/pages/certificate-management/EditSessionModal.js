import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const EditSessionModal = ({ session, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    place: session.place,
    fromDateTime: session.fromDateTime,
    toDateTime: session.toDateTime,
    certificateType: session.certificateType,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/sessions/${session.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedSession = await response.json();
        onUpdate(updatedSession);
      } else {
        console.error("Error updating session");
      }
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Session</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Place"
          />
          <input
            type="datetime-local"
            name="fromDateTime"
            value={formData.fromDateTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="datetime-local"
            name="toDateTime"
            value={formData.toDateTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="certificateType"
            value={formData.certificateType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Certificate Type"
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default EditSessionModal;
