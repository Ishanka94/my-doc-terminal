import React, { useState, useEffect, useContext, Fragment } from 'react';
import AddDoctorDetails from './AddDoctorDetails';
import EditDoctorDetails from './EditDoctorDetails';
import AuthContext from '../../contexts/AuthContext';
import ReactPaginate from 'react-paginate';
import DoctorService from '../../services/DoctorService';
import FetchClient from '../../services/FetchClient';
import * as AppConstants from '../../util/constants';
import ConsoleLogger from '../../util/Logger';
import { PencilIcon, Bars3Icon } from '@heroicons/react/20/solid';
import DisplayDoctorInfo from './DisplayDoctorInfo';
import { useDispatch, useSelector } from "react-redux";
import { updateDoctors, showDocModel, setCurrentDoctor, showDocEditModel, showDocInfoModel } from "../../actions/doctorActions";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import * as DoctorStatus from '../../util/constants/DoctorStatus';
import { CheckIcon, ChevronUpDownIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const ALL = 'ALL';

const docStatus = [
  { name: 'All', key: ALL },
  { name: 'Active', key: DoctorStatus.ACTIVE },
  { name: 'Inactive', key: DoctorStatus.INACTIVE },
  { name: 'Pending', key: DoctorStatus.PENDING_APPROVAL }
]

function DoctorsDetails() {

  const dispatch = useDispatch();
  const showDoctorModal = useSelector(state => state.doctor.showDoctorModal);
  const showDoctorEditModal = useSelector(state => state.doctor.showDoctorEditModal);
  const showDoctorInfoModal = useSelector(state => state.doctor.showDoctorInfoModal);
  const doctors = useSelector(state => state.doctor.doctors);
  const doctor = useSelector(state => state.doctor.doctor);
  const [selected, setSelected] = useState(docStatus[0]);
  const [updatePage, setUpdatePage] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  const authContext = useContext(AuthContext);
  const doctorService = new DoctorService(FetchClient);

  const logger = new ConsoleLogger(window.Configs.logLevel);

  useEffect(() => {
    fetchDoctors(0);
  }, [AppConstants.TABLE_PAGE_SIZE]);


  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    fetchDoctors(currentPage);
  };

  const fetchDoctors = async (currentPage) => {
    try {
      logger.log('Sending all user fetch request', 'DoctorsDetails.js');
      const endpoint = window.Configs.backendUrl + `auth/get-all-users?page=${currentPage}&limit=${AppConstants.TABLE_PAGE_SIZE}`;
      const res = await doctorService.getDoctors(endpoint);
      const data = await res.json();
      const doctorsList = data?.data?.allUsers;
      const total = data?.data?.total;
      setPageCount(Math.ceil(total / AppConstants.TABLE_PAGE_SIZE));
      dispatch(updateDoctors(doctorsList))
    } catch (error) {
      logger.error(error);
    }
  };

  const addSaleModalSetting = () => {
    dispatch(showDocModel(!showDoctorModal))
  };

  const addDocEditModalSetting = (doctor) => {
    dispatch(setCurrentDoctor(doctor));
    dispatch(showDocEditModel(!showDoctorEditModal))
  };

  const addDocinfoModalSetting = (doctor) => {
    dispatch(setCurrentDoctor(doctor));
    dispatch(showDocInfoModel(!showDoctorInfoModal))
  };

  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex flex-col items-center">
      <div className="flex flex-col gap-5 w-11/12">
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
            selectedDoctor={doctor}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {showDoctorInfoModal && (
          <DisplayDoctorInfo
            addDocinfoModalSetting={addDocinfoModalSetting}
          />
        )}
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3 items-center">
            <div className="flex gap-4 items-center">
              <span className="font-bold">Doctor Details</span>
            </div>
            <div className="flex gap-4 items-center">
              <label>Status</label>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-40 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {docStatus.map((status, statusIdx) => (
                        <Listbox.Option
                          key={statusIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                            }`
                          }
                          value={status}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {status.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
                onClick={addSaleModalSetting}
              >
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
              {doctors.map((element, index) => (
                <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                    {element.doctorId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.doctorName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {element.nic}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <button onClick={() => addDocEditModalSetting(element)}>
                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <button onClick={() => addDocinfoModalSetting(element)}>
                      <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-container py-3">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-center"}
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
      </div>
    </div>
  )
}

export default DoctorsDetails;
