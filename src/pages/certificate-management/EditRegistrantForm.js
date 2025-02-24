import React, { useState, useEffect } from "react";
import { STATUS_MAP } from "../../constants/statusConstants";

const EditRegistrantForm = ({ registrant, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    station: "",
    certificateType: "",
    sessionDuration: { from: "", to: "" },
    status: ""
  });

  const [certificateTypes, setCertificateTypes] = useState([]);

  useEffect(() => {
    if (registrant) {
    console.log(registrant);
      setFormData({
        name: registrant.registreeName,
        email: registrant.email,
        contact: registrant.contact,
        station: registrant.station?._id || "",
        certificateType: registrant.certificateType?._id || "",
        sessionDuration: registrant.sessionDuration || { from: "", to: "" },
        status: registrant.status
      });
    }
  }, [registrant]);

  useEffect(() => {
    fetch("http://localhost:3000/api/certificate/get-all-certificate-types")
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        setCertificateTypes(data?.data?.certificateTypeList);
        // setSelectedCertificate(data?.data?.certificateTypeList[0]);  // Select first by default
        // setValue("certificateType", data?.data?.certificateTypeList[0]._id); // Set default in form
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

  const handleSessionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      sessionDuration: {
        ...formData.sessionDuration,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/certificate/update-registrant/${registrant._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
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
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 mb-2 border rounded" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 mb-2 border rounded" required />
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" className="w-full p-2 mb-2 border rounded" required />
          {/* <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status" className="w-full p-2 mb-2 border rounded" required /> */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {Object.entries(STATUS_MAP).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <select
            name="certificateType"
            value={formData.certificateType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Certificate Type</option>
            {certificateTypes.map((type) => (
              <option key={type.certificateId} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2 mb-2">
            <input type="text" name="from" value={formData.sessionDuration.from} onChange={handleSessionChange} placeholder="Session From" className="w-1/2 p-2 border rounded" required />
            <input type="text" name="to" value={formData.sessionDuration.to} onChange={handleSessionChange} placeholder="Session To" className="w-1/2 p-2 border rounded" required />
          </div>
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