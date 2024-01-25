import { Fragment, useRef, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import * as DoctorStatus from '../../util/constants/DoctorStatus';
import DoctorService from '../../services/DoctorService';
import FetchClient from '../../services/FetchClient';
import ConsoleLogger from '../../util/Logger';

const docStatus = [
  { name: 'Active', key: DoctorStatus.ACTIVE  },
  { name: 'Inactive', key: DoctorStatus.INACTIVE },
  { name: 'Pending', key: DoctorStatus.PENDING_APPROVAL }
]

const getCurrentStatus = (selectedDoc) => {
  switch(selectedDoc?.status) {
    case DoctorStatus.ACTIVE:
      return docStatus[0];
    case DoctorStatus.INACTIVE:
      return docStatus[1];
    case DoctorStatus.PENDING_APPROVAL:
      return docStatus[2];
    default:
      return docStatus[0];
  }
}

export default function DisplayDoctorInfo({
  addDocinfoModalSetting,
  selectedDoctor,
  handlePageUpdate,
  authContext
}) {
  const [doctor, setDoctor] = useState(selectedDoctor ? selectedDoctor : {
    userID: authContext.user,
    doctorId: "",
    doctorName: "",
    category: "",
    nic: "",
    attachment: "",
    email: "",
    contact: ""
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  let selectedStatus = getCurrentStatus(selectedDoctor);
  const [selected, setSelected] = useState(selectedStatus ? selectedStatus : docStatus[0]);

  const doctorService = new DoctorService(FetchClient);
  const logger = new ConsoleLogger(window.Configs.logLevel);

  const closeModal = () => {
    addDocinfoModalSetting();
  }

  // POST Data
  const updateDoctor = async () => {
    doctor.status = selected.key;
    const endpoint = window.Configs.backendUrl + 'auth/update';
    try {
      const res = await doctorService.sendPostRequest(endpoint, doctor);
      const data = await res.json();
      if (data) {
        alert("Doctor status updated");
        handlePageUpdate();
        addDocinfoModalSetting();
      }
    } catch(err) {
      logger.error(err);
    }
  };

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg overflow-y-scroll">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg  py-4 font-semibold leading-6 text-gray-900 "
                      >
                        Doctor Info
                      </Dialog.Title>
                      <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="doctorId"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Doctor ID
                            </label>
                            <input
                              type="text"
                              disabled="true"
                              name="doctorId"
                              id="doctorId"
                              value={selectedDoctor.doctorId}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="D_123"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="doctorName"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Doctor name
                            </label>
                            <input
                              type="text"
                              disabled="true"
                              name="doctorName"
                              id="doctorName"
                              value={selectedDoctor.doctorName}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              email
                            </label>
                            <input
                              type="text"
                              disabled="true"
                              name="email"
                              id="email"
                              value={selectedDoctor.email}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="abc@gmail.com"
                            />
                          </div>
                          <div className="h-fit w-fit">
                            {/* <Datepicker
                              onChange={handleChange}
                              show={show}
                              setShow={handleClose}
                            /> */}
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              htmlFor="purchaseDate"
                            >
                              NIC
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              type="text"
                              disabled="true"
                              id="nic"
                              name="nic"
                              value={selectedDoctor.nic}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="attachment"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Attachment
                            </label>
                            { selectedDoctor.attachment ? <img src={`${selectedDoctor.attachment}`} /> : null }
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                        </div>
                  </form>
                    </div>
                    
                  </div>







            








                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => addDocinfoModalSetting()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
