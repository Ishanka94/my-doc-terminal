import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from "react-redux";

export default function DisplayDoctorInfo({
  addDocinfoModalSetting,
}) {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const closeModal = () => {
    addDocinfoModalSetting();
  };

  const currentDoctor = useSelector(state => state.doctor.doctor);
  return (
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg py-4 font-semibold leading-6 text-gray-900"
                      >
                        Doctor Info
                      </Dialog.Title>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Doctor ID
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {currentDoctor.doctorId || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Doctor Name
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {currentDoctor.doctorName || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Email
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {currentDoctor.email || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            NIC
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {currentDoctor.nic || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Contact
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {currentDoctor.contact || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Channels enabled
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {currentDoctor?.channels?.length > 1 ? (currentDoctor?.channels[0] + ', ' + currentDoctor?.channels[1]): currentDoctor.channels[0] || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Subscription package
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {currentDoctor.subscriptionPackage || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Subscription Expiry
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {currentDoctor.subscriptionExpiry || "N/A"}
                          </p>
                        </div>
                      </div>
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
                    Close
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
