import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { useForm } from "react-hook-form";

const RegisterSessionForm = () => {
  const [stations, setStations] = useState([]);  // Dropdown data
  const [selectedStation, setSelectedStation] = useState(null);
  const { register, handleSubmit, setValue } = useForm();
  const [certificateTypes, setcertificateTypes] = useState([]);  // Dropdown data
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Fetch station data from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/certificate/get-all-stations")
      .then(response => response.json())
      .then(data => {
        // console.log(data.data.stationList);
        setStations(data?.data?.stationList);
        setSelectedStation(data?.data?.stationList[0]);  // Select first by default
        setValue("station", data?.data?.stationList[0]?._id); // Set default in form
      })
      .catch(error => console.error("Error fetching stations:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/certificate/get-all-certificate-types")
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        setcertificateTypes(data?.data?.certificateTypeList);
        setSelectedCertificate(data?.data?.certificateTypeList[0]);  // Select first by default
        setValue("certificateType", data?.data?.certificateTypeList[0]._id); // Set default in form
      })
      .catch(error => console.error("Error fetching certificate types:", error));
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data);
    try {
      data.sessionDuration = {
        from: new Date(data.from).toISOString(),
        to: new Date(data.to).toISOString()
      };
      delete data.from;
      delete data.to;

      const response = await fetch("http://localhost:3000/api/certificate/register-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Failed to register session");

      const result = await response.json();
      console.log("Session registered:", result);
    } catch (error) {
      console.error("Error registering session:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Register for a Session</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />

        {/* Registree Name */}
        <input
          type="text"
          {...register("registreeName", { required: true })}
          placeholder="Registree Name"
          className="w-full p-2 border rounded"
        />

        {/* Contact */}
        <input
          type="text"
          {...register("contact", { required: true })}
          placeholder="Contact"
          className="w-full p-2 border rounded"
        />

        {/* Certificate types (Dropdown with Headless UI) */}
        <Listbox value={selectedCertificate} onChange={(value) => {
          setSelectedCertificate(value);
          setValue("certificateType", value);
        }}>
          <div className="relative">
            <Listbox.Button className="w-full p-2 border rounded bg-white">
              {selectedCertificate?.name || "Select a certificate type"}
            </Listbox.Button>
            <Listbox.Options className="absolute w-full bg-white border rounded mt-1">
              {certificateTypes.map((certificate, idx) => (
                <Listbox.Option key={idx} value={certificate} className="p-2 hover:bg-gray-100 cursor-pointer">
                  {certificate.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* Station (Dropdown with Headless UI) */}
        <Listbox value={selectedStation} onChange={(value) => {
          setSelectedStation(value);
          setValue("station", value._id);
        }}>
          <div className="relative">
            <Listbox.Button className="w-full p-2 border rounded bg-white">
              {selectedStation?.name || "Select a station"}
            </Listbox.Button>
            <Listbox.Options className="absolute w-full bg-white border rounded mt-1">
              {stations.map((station, idx) => (
                <Listbox.Option key={idx} value={station} className="p-2 hover:bg-gray-100 cursor-pointer">
                  {station.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* Session Duration */}
        <label className="block">Session Start:</label>
        <input
          type="datetime-local"
          {...register("from", { required: true })}
          className="w-full p-2 border rounded"
        />

        <label className="block">Session End:</label>
        <input
          type="datetime-local"
          {...register("to", { required: true })}
          className="w-full p-2 border rounded"
        />

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterSessionForm;
