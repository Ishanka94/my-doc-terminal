import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";

const ViewRegistrants = () => {
  const { trainingSessionId } = useParams();
  const location = useLocation();
  const [registrants, setRegistrants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${window.Configs.backendUrl}/certificate/filter-registrants?trainingSession=${trainingSessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setRegistrants(data?.data?.registrees);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching registrants:", error);
        setLoading(false);
      });
  }, [trainingSessionId]);

  const generateReport = () => {
    const worksheet = XLSX.utils.json_to_sheet(registrants);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrants");
    XLSX.writeFile(workbook, `Session_Registrants.xlsx`);
  };

  if (loading) return <p>Loading registrants...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Session Registrants - { location.state?.station } - { location.state?.certificateType }</h2>
      <button
        onClick={generateReport}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mb-4"
      >
        Download Report
      </button>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {registrants.map((registrant) => (
          <li key={registrant._id} className="border-b py-2">
            {registrant.registreeName} - {registrant.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewRegistrants;
