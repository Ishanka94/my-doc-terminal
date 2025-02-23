import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import EditRegistrantForm from "./EditRegistrantForm";

const RegistrantsList = () => {
  const [registrants, setRegistrants] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stations, setStations] = useState([]);
  const [certificateTypes, setCertificateTypes] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRegistrant, setCurrentRegistrant] = useState(null);

  useEffect(() => {
    fetchRegistrants();
    fetchStations();
    fetchCertificateTypes();
  }, []);

  const fetchRegistrants = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/certificate/filter-registrants");
      const data = await response.json();
      setRegistrants(data?.data?.registrees);
      setFilteredData(data?.data?.registrees);
    } catch (error) {
      console.error("Error fetching registrants:", error);
    }
  };

  const fetchStations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/certificate/get-all-stations");
      const data = await response.json();
      setStations(data?.data?.stationList);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const fetchCertificateTypes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/certificate/get-all-certificate-types");
      const data = await response.json();
      setCertificateTypes(data?.data?.certificateTypeList);
    } catch (error) {
      console.error("Error fetching certificate types:", error);
    }
  };

  const handleFilter = async () => {
    try {
        // console.log('click filter')
        // console.log(selectedStation)
      const response = await fetch(
        `http://localhost:3000/api/certificate/filter-registrants?registreeName=${searchTerm}&station=${selectedStation}&certificate=${selectedCertificate}`
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
    setSelectedStation("");
    setSelectedCertificate("");
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
        await fetch(`http://localhost:3000/api/certificate/delete-registrant/${id}`, {
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
//   console.log('Current data');
//   console.log(currentData);

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
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="*">All Stations</option>
            {stations.map((station) => (
              <option key={station._id} value={station._id}>{station.name}</option>
            ))}
          </select>
          <select
            value={selectedCertificate}
            onChange={(e) => setSelectedCertificate(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="*">All Certificates</option>
            {certificateTypes.map((cert) => (
              <option key={cert._id} value={cert._id}>{cert.name}</option>
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
                    <td className="p-3 border">{registrant.name}</td>
                    <td className="p-3 border">{registrant.station?.name}</td>
                    <td className="p-3 border">{registrant.email}</td>
                    <td className="p-3 border">{registrant.contact}</td>
                    <td className="p-3 border">{registrant.certificateType?.name}</td>
                    <td className="p-3 border">{registrant.sessionDuration?.from + ' - ' + registrant.sessionDuration?.to}</td>
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
