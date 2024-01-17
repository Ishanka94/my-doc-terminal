import { Fragment, useRef, useState } from "react";
import { Dialog, Transition, Listbox, Menu } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import * as DoctorStatus from '../util/constants/DoctorStatus';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const docStatus = [
  { name: 'Active' },
  { name: 'Inactive' },
  { name: 'Pending' }
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

export default function EditDoctorDetails({
  addDocEditModalSetting,
  selectedDoctor,
  handlePageUpdate,
  authContext
}) {
  // const [purchase, setPurchase] = useState({
  //   userID: authContext.user,
  //   productID: "",
  //   quantityPurchased: "",
  //   purchaseDate: "",
  //   totalPurchaseAmount: "",
  // });
  const [doctor, setDoctor] = useState({
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
  // if (selectedDoctor.status === 'PENDING_APPROVAL') {
  //   selectedStatus = docStatus[2];
  // }

  // const [selected, setSelected] = useState(selectedStatus ? selectedStatus : docStatus[0]);

 

  // Handling Input Change for input fields
  const handleInputChange = (key, value) => {
    setDoctor({ ...doctor, [key]: value });
  };

  const closeModal = () => {
    addDocEditModalSetting();
  }

  const testMethod = () => {
    console.log('button clicked bro');
  }

  // POST Data
  const registerDoctor = () => {
    fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(doctor),
    })
      .then((result) => {
        alert("Doctor details added");
        handlePageUpdate();
        addDocEditModalSetting();
      })
      .catch((err) => console.log(err));
  };

  const getFiles = (files) =>{
    const obj = { attachment: files[0].base64 };
    setDoctor({ ...doctor, ...obj });
    // this.setState({ files: files })
  }

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
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg  py-4 font-semibold leading-6 text-gray-900 "
                      >
                         Edit doctor status
                      </Dialog.Title>
                      <Listbox value={selected} onChange={setSelected}>
                        <div className="relative mt-1">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">{selected.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
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
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={registerDoctor}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => addDocEditModalSetting()}
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
