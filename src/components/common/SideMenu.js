import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SideMenu() {
  // const localStorageData = JSON.parse(localStorage.getItem("user"));
  const authenticatedUser = useSelector(state => state.auth.user);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  return (
    <div className="h-full flex-col justify-between  bg-white hidden lg:flex ">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700"
          >
            <img
              alt="dashboard-icon"
              src={require("../../assets/dashboard-icon.png")}
            />
            <span className="text-sm font-medium"> Dashboard </span>
          </Link>

          {/* <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/inventory">
                <div className="flex items-center gap-2">
                  <img
                    alt="inventory-icon"
                    src={require("../assets/inventory-icon.png")}
                  />
                  <span className="text-sm font-medium"> Inventory </span>
                </div>
              </Link>
            </summary>
          </details> */}

          {/* <Link
            to="/purchase-details"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../assets/supplier-icon.png")}
            />
            <span className="text-sm font-medium"> Purchase Details</span>
          </Link> */}
          <Link
            to="/doctors-details"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img
              alt="purchase-icon"
              src={require("../../assets/supplier-icon.png")}
            />
            <span className="text-sm font-medium"> Doctor Details</span>
          </Link>

          <div className="flex flex-col">
            <button
              onClick={() => setIsReportsOpen(!isReportsOpen)}
              className="flex items-center justify-between w-full rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <div className="flex items-center gap-2">
                <img alt="reports-icon" src={require("../../assets/reports-icon.png")} />
                <span className="text-sm font-medium">Certificates</span>
              </div>
              <span>{isReportsOpen ? "▲" : "▼"}</span>
            </button>

            {/* Sub-menu Items */}
            {isReportsOpen && (
              <div className="ml-8 space-y-1">
                <Link
                  to="/registrants-list"
                  className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Session Registrees
                </Link>
                <Link
                  to="/reports/monthly"
                  className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Session stations
                </Link>
                <Link
                  to="/register-professional"
                  className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  Medical professional Register
                </Link>
              </div>
            )}
          </div>  


          {/* <Link
            to="/sales"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <img alt="sale-icon" src={require("../assets/supplier-icon.png")} />
            <span className="text-sm font-medium"> Sales</span>
          </Link> */}

          {/* <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              <Link to="/manage-store">
                <div className="flex items-center gap-2">
                  <img
                    alt="store-icon"
                    src={require("../assets/order-icon.png")}
                  />
                  <span className="text-sm font-medium"> Manage Store </span>
                </div>
              </Link>
            </summary>
          </details> */}
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt="Profile"
            src={require("../../assets/profile-pic.jpg")}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">
                { authenticatedUser?.doctorName }
              </strong>

              <span> {authenticatedUser?.doctorId} </span>
              <br />
              <span> Version: {window.Configs.appVersion} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
