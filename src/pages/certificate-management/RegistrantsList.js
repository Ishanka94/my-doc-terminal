import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const RegistrantsList = () => {
  const [registrants, setRegistrants] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5); // Adjust as needed

  useEffect(() => {
    fetchRegistrants();
  }, []);

  const fetchRegistrants = async () => {
    try {
      const response = await fetch("https://your-backend-api.com/registrants");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setRegistrants(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Filter Function
  const handleFilter = () => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = registrants.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.station.toLowerCase().includes(lowerSearch) ||
        item.email.toLowerCase().includes(lowerSearch)
    );
    setFilteredData(filtered);
    setCurrentPage(0);
  };

  // Reset Filters
  const handleReset = () => {
    setFilteredData(registrants);
    setSearchTerm("");
    setCurrentPage(0);
  };

  // Handle Page Click
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Edit Handler
  const handleEdit = (id) => {
    console.log("Edit registrant:", id);
  };

  // Delete Handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this registrant?")) {
      try {
        const response = await fetch(`https://your-backend-api.com/registrants/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete registrant");
        }
        setRegistrants((prev) => prev.filter((registrant) => registrant.id !== id));
        setFilteredData((prev) => prev.filter((registrant) => registrant.id !== id));
      } catch (error) {
        console.error("Error deleting registrant:", error);
      }
    }
  };

  // Pagination Logic
  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="w-screen p-4 bg-white rounded-lg shadow-md">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Registrants List</h2>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <input
            type="text"
            placeholder="Search by name, station, or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md flex-grow sm:w-64"
          />
          <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Filter
          </button>
          <button onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded-md">
            Reset
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Station</th>
                <th className="p-3 border text-left">Email</th>
                <th className="p-3 border text-left">Contact</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((registrant) => (
                  <tr key={registrant.id} className="text-center">
                    <td className="p-3 border">{registrant.name}</td>
                    <td className="p-3 border">{registrant.station}</td>
                    <td className="p-3 border">{registrant.email}</td>
                    <td className="p-3 border">{registrant.contact}</td>
                    <td className="p-3 border flex justify-center gap-3">
                      <button onClick={() => handleEdit(registrant.id)} className="text-blue-600">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(registrant.id)} className="text-red-600">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 border text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-4">
          <span className="text-gray-600 text-sm">
            Showing {offset + 1}-{Math.min(offset + itemsPerPage, filteredData.length)} of {filteredData.length}
          </span>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"flex flex-wrap gap-2"}
            previousLinkClassName={"px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"}
            nextLinkClassName={"px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"}
            activeClassName={"bg-blue-500 text-white px-3 py-1 rounded"}
            pageClassName={"px-3 py-1 border rounded"}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrantsList;
