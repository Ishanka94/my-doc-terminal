import React, { useState, useEffect, useContext } from "react";
import AddDoctorDetails from "../components/AddDoctorDetails";
import EditDoctorDetails from "../components/EditDoctorDetails";
import AuthContext from "../AuthContext";
import ReactPaginate from "react-paginate";

function DoctorsDetails() {
  const [showDoctorModal, setDoctorModal] = useState(false);
  const [showDoctorEditModal, setDoctorEditModal] = useState(false);
  const [doctors, setAllDoctors] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const [items, setItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  let limit = 10;

  const authContext = useContext(AuthContext);

  useEffect(() => {
    // fetchDoctorsList();
    const getDoctors = async () => {
      const res = await fetch(
        `http://localhost:5001/api/auth/get-all-users?page=0&limit=${limit}`
        // `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const doctorsList = data?.data?.allUsers;
      const total = data?.data?.total;
      setpageCount(Math.ceil(total / limit));
      setAllDoctors(doctorsList);
    };

    getDoctors();
  }, [limit]);

  const fetchDoctorsList = () => {
    fetch(`http://localhost:5001/api/auth/get-all-users?page=1&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setAllDoctors(data.data);
        setpageCount(5);
      })
      .catch((err) => console.log(err));
  }


  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    const doctorsFromServer = await fetchDoctors(currentPage);

    setAllDoctors(doctorsFromServer);

    // scroll to the top
    //window.scrollTo(0, 0)
  };

  const fetchDoctors = async (currentPage) => {
    const res = await fetch(
      `http://localhost:5001/api/auth/get-all-users?page=${currentPage}&limit=${limit}`
    );
    const data = await res.json();
    const doctorsList = data?.data?.allUsers;
    return doctorsList;
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setDoctorModal(!showDoctorModal);
  };

  const addDocEditModalSetting = (doctor) => {
    setDoctorEditModal(!showDoctorEditModal);
  };


  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showDoctorModal && (
          <AddDoctorDetails
            addSaleModalSetting={addSaleModalSetting}
            doctors={doctors}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {showDoctorEditModal && (
          <EditDoctorDetails
          addDocEditModalSetting={addDocEditModalSetting}
            doctors={doctors}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Doctors Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addSaleModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Doctor
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Doctor ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Doctor Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  NIC
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {doctors.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.doctorId}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.doctorName}
                    </td>
                    {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {new Date(element.PurchaseDate).toLocaleDateString() ==
                      new Date().toLocaleDateString()
                        ? "Today"
                        : element.PurchaseDate}
                    </td> */}
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.nic}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <button onClick={() => addDocEditModalSetting(element)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ReactPaginate 
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default DoctorsDetails;
