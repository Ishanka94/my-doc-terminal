import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { useForm } from "react-hook-form";

const RegisterSessionForm = () => {
  const [trainingSessions, setTrainingSessions] = useState([]);  // Dropdown data
  const [selectedTrainingSession, setSelectedTrainingSession] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  // Fetch station data from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/certificate/get-training-sessions")
      .then(response => response.json())
      .then(data => {
        setTrainingSessions(data?.data?.trainingSessionList);
        setSelectedTrainingSession(data?.data?.trainingSessionList[0]);  // Select first by default
        setValue("trainingSession", data?.data?.trainingSessionList[0]?._id); // Set default in form
      })
      .catch(error => console.error("Error fetching training sessions:", error));
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:3000/api/certificate/register-trainee", {
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
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          {...register("registreeName", { required: true })}
          placeholder="Registree Name"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          {...register("contact", { required: true })}
          placeholder="Contact"
          className="w-full p-2 border rounded"
        />

        {/* Training sessions (Dropdown with Headless UI) */}
        <Listbox value={selectedTrainingSession} onChange={(value) => {
          setSelectedTrainingSession(value);
          setValue("trainingSession", value._id);
        }}>
          <div className="relative">
            <Listbox.Button className="w-full p-2 border rounded bg-white">
              {selectedTrainingSession?.station || "Select training session"}
            </Listbox.Button>
            <Listbox.Options className="absolute w-full bg-white border rounded mt-1">
              {trainingSessions.map((trainSession, idx) => (
                <Listbox.Option key={idx} value={trainSession} className="p-2 hover:bg-gray-100 cursor-pointer">
                  { trainSession.station + "-" + trainSession?.certificateType?.name }
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterSessionForm;
