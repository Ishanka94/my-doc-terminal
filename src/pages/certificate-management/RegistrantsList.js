import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import EditRegistrantForm from "./EditRegistrantForm";

const RegistrantsList = () => {
  const [registrants, setRegistrants] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainingSession, setSelectedTrainingSession] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRegistrant, setCurrentRegistrant] = useState(null);
  const [trainingSessions, setTrainingSessions] = useState([]);

  useEffect(() => {
    fetchRegistrants();
    fetchTrainingSessions();
  }, []);

  const fetchRegistrants = async () => {
    try {
      const response = await fetch(`${window.Configs.backendUrl}/certificate/filter-registrants`);
      const data = await response.json();
      setRegistrants(data?.data?.registrees);
      setFilteredData(data?.data?.registrees);
    } catch (error) {
      console.error("Error fetching registrants:", error);
    }
  };

  const fetchTrainingSessions = async () => {
    try {
      const response = await fetch(`${window.Configs.backendUrl}/certificate/get-training-sessions`);
      const data = await response.json();
      setTrainingSessions(data?.data?.trainingSessionList);
    } catch (error) {
      console.error("Error fetching training sessions:", error);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await fetch(
        `${window.Configs.backendUrl}/certificate/filter-registrants?registreeName=${searchTerm}&trainingSession=${selectedTrainingSession}`
      );
      const data = await response.json();
      setFilteredData(data?.data?.registrees);
      setCurrentPage(0);
    } catch (error) {
      console.error("Error filtering registrants:", error);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedTrainingSession("");
    setFilteredData(registrants);
    setCurrentPage(0);
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleEdit = (registrant) => {
    setCurrentRegistrant(registrant);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this registrant?")) {
      try {
        await fetch(`${window.Configs.backendUrl}/certificate/delete-registrant/${id}`, {
          method: "DELETE",
        });
        fetchRegistrants(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting registrant:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setCurrentRegistrant(null);
    fetchRegistrants(); // Refresh list after editing
  };

  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="w-screen p-4 bg-white rounded-lg shadow-md">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Registrants List</h2>

        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <input
            type="text"
            placeholder="Search by name, station, or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md flex-grow sm:w-64"
          />
          <select
            value={selectedTrainingSession}
            onChange={(e) => setSelectedTrainingSession(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="*">All training sessions</option>
            {trainingSessions.map((trainingSession) => (
              <option key={trainingSession._id} value={trainingSession._id}>{trainingSession.station + "-" + trainingSession.certificateType + "-" + trainingSession.sessionDuration }</option>
            ))}
          </select>
          <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Filter
          </button>
          <button onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded-md">
            Reset
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Station</th>
                <th className="p-3 border text-left">Email</th>
                <th className="p-3 border text-left">Contact</th>
                <th className="p-3 border text-left">Certificate module</th>
                <th className="p-3 border text-left">Session duration</th>
                <th className="p-3 border text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((registrant) => (
                  <tr key={registrant._id} className="text-center">
                    <td className="p-3 border">{registrant.registreeName}</td>
                    <td className="p-3 border">{registrant?.trainingSession?.station}</td>
                    <td className="p-3 border">{registrant.email}</td>
                    <td className="p-3 border">{registrant.contact}</td>
                    <td className="p-3 border">{registrant?.trainingSession?.certificateType?.name}</td>
                    <td className="p-3 border">{ registrant.trainingSession?.sessionDuration?.from + ' - ' + registrant.trainingSession?.sessionDuration?.to }</td>
                    <td className="p-3 border">{registrant.status}</td>
                    <td className="p-3 border text-center">
                        <button onClick={() => handleEdit(registrant)} className="text-blue-500 mx-2">
                            <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(registrant._id)} className="text-red-500 mx-2">
                            <FaTrash />
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 border text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex flex-wrap gap-2 mt-4"}
          activeClassName={"bg-blue-500 text-white px-3 py-1 rounded"}
          pageClassName={"px-3 py-1 border rounded"}
        />
        {isEditModalOpen && <EditRegistrantForm registrant={currentRegistrant} onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default RegistrantsList;
