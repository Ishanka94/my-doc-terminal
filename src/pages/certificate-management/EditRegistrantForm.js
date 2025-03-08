import React, { useState, useEffect } from "react";
import { STATUS_MAP } from "../../constants/statusConstants";
import { useSelector } from "react-redux";
import { hasPermission } from "../../util/permissions";
import { sendEditRegistrantRequest, getTrainingSessionList } from '../../api/backendApi';

const EditRegistrantForm = ({ registrant, onClose, onUpdate }) => {
  const user = useSelector((state) => state.auth.user);
  // const test = hasPermission(user, "updateRegistreeStatus");

  const [formData, setFormData] = useState({
    registreeName: "",
    email: "",
    contact: "",
    status: ""
  });

  const [trainingSessions, setTrainingSessions] = useState([]);

  useEffect(() => {
    if (registrant) {
      setFormData({
        registreeName: registrant.registreeName,
        email: registrant.email,
        contact: registrant.contact,
        status: registrant.status,
        trainingSession: registrant.trainingSession?._id || ""
      });
    }
  }, [registrant]);

  useEffect(() => {
    fetch(`${window.Configs.backendUrl}/certificate/get-training-sessions`)
      .then(response => response.json())
      .then(data => {
        setTrainingSessions(data?.data?.trainingSessionList);
      })
      .catch(error => console.error("Error fetching certificate types:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendEditRegistrantRequest(formData, registrant._id);
      if (response.ok) {
        onUpdate(); // Refresh registrants list after update
        onClose();
      } else {
        console.error("Failed to update registrant");
      }
    } catch (error) {
      console.error("Error updating registrant:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Edit Registrant</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="registreeName" value={formData.registreeName} onChange={handleChange} placeholder="Name" className="w-full p-2 mb-2 border rounded" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 mb-2 border rounded" required />
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="w-full p-2 mb-2 border rounded" required />
          {/* <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" className="w-full p-2 mb-2 border rounded" required /> */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={!hasPermission(user, "updateRegistreeStatus")}
            className="w-full p-2 border rounded"
          >
            {Object.entries(STATUS_MAP).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <select
            name="trainingSession"
            value={formData.trainingSession}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Training Session</option>
            {trainingSessions.map((trainSession) => (
              <option key={trainSession._id} value={trainSession._id}>
                {trainSession?.station + "-" + trainSession?.certificateType?.name}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRegistrantForm;