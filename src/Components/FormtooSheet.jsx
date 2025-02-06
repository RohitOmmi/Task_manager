import React, { useState, useEffect } from "react";

function FormtooSheet() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState({});
  const [updatedAssignees, setUpdatedAssignees] = useState({});
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("");
  // Fetch data from Google Sheets
  const fetchData = () => {
    const url =
      "https://script.google.com/macros/s/AKfycbzWQ3tKTacFScSqV4jmsS0fRN_0mRiUwsENiJ-uEwg_SI2DWpyUo8yqFsc8neDCmuSE7w/exec";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const filteredTasks = data.filter(
          (task) => task.status !== "Completed"
        );
        setTasks(filteredTasks);
      })
      .catch((error) => console.log("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const url =
      "https://script.google.com/macros/s/AKfycbzWQ3tKTacFScSqV4jmsS0fRN_0mRiUwsENiJ-uEwg_SI2DWpyUo8yqFsc8neDCmuSE7w/exec";
    const formData = new URLSearchParams();
    formData.append("RequestRaisedBy", e.target.requestRaised.value);
    formData.append("Task", e.target.name.value);
    formData.append("Comments", e.target.Comments.value);
    formData.append("TaskAssignedto", e.target.task_assigned.value);
    formData.append("priority", e.target.priority.value);
    formData.append("status", "Yet to Start"); // Default status to "Yet to Start"

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        fetchData(); // Refresh data
        e.target.reset();
        setAssignedTo("")
        setPriority("")
      })
      .catch((error) => console.log("Error adding task:", error));
  };

  const handleStatusChange = (e, task) => {
    const newStatus = e.target.value;
    let newComment = prompt("Add a comment (optional):") || "";

    const url =
      "https://script.google.com/macros/s/AKfycbzWQ3tKTacFScSqV4jmsS0fRN_0mRiUwsENiJ-uEwg_SI2DWpyUo8yqFsc8neDCmuSE7w/exec";
    const formData = new URLSearchParams({
      Task: task.Task,
      status: newStatus,
      Comments: newComment,
      update: "true",
    });

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    })
      .then(() => {
        fetchData(); // Refresh data after update
      })
      .catch((error) => console.log("Error during task status change:", error));
  };

  const handleCheckboxChange = (taskindex) => {
    setSelectedTasks((prev) => ({
      ...prev,
      [taskindex]: !prev[taskindex],
    }));
  };

  const handleAssigneeChange = (taskindex, newAssignee) => {
    setUpdatedAssignees((prev) => ({
      ...prev,
      [taskindex]: newAssignee,
    }));
  };

  const handleSaveChanges = () => {
    const url =
      "https://script.google.com/macros/s/AKfycbzWQ3tKTacFScSqV4jmsS0fRN_0mRiUwsENiJ-uEwg_SI2DWpyUo8yqFsc8neDCmuSE7w/exec";

    // Create a list of tasks to update
    const tasksToUpdate = Object.keys(selectedTasks).filter(
      (index) => selectedTasks[index] && updatedAssignees[index]
    );

    // Update the selected tasks
    tasksToUpdate.forEach((index) => {
      const newAssignee = updatedAssignees[index];

      // Prepare the form data for updating
      const formData = new URLSearchParams({
        taskId: index,
        TaskAssignedto: newAssignee,
        status: "Yet to Start", // Ensure the task is marked "Yet to Start" after reassignment
        reassign: "true",
      });

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      })
        .then(() => fetchData()) // Refresh data after updating
        .catch((error) =>
          console.log("Error during task reassignment:", error)
        );
    });
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#F4E4C9] to-[#CCBA8D] p-10 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 flex flex-wrap gap-4 w-full items-center"
      >
        <input
          name="requestRaised"
          type="text"
          placeholder="Request Raised By"
          required
          className="flex-1 p-2 border rounded-md focus:outline-blue-400"
        />
        <input
          name="name"
          type="text"
          placeholder="Task Name"
          required
          className="flex-1 p-2 border rounded-md focus:outline-blue-400"
        />
        <input
          name="Comments"
          type="text"
          placeholder="Comments"
          className="flex-1 p-2 border rounded-md focus:outline-blue-400"
        />
        <select
          name="task_assigned"
          required
          className="border rounded-md p-2"
          value={assignedTo} // Bind value to state
          onChange={(e) => setAssignedTo(e.target.value)} // Update state on change
        >
          <option value="" disabled >
            Assigned To
          </option>
          <option value="Govind">Govind</option>
          <option value="Sai Rama Krishna">Sai Rama Krishna</option>
          <option value="Sunil">Sunil</option>
          <option value="Kanaka">Kanaka</option>
          <option value="Bangaru Naidu">Bangaru Naidu</option>
          <option value="Durga">Durga</option>
          <option value="Swetha">Swetha</option>
          <option value="Devi">Devi</option>
          <option value="Dhana Lakshmi">Dhana Lakshmi</option>
          <option value="Rohit">Rohit</option>
        </select>
        <select
         name="priority"
          required 
          className="border rounded-md p-2"
          value={priority}
          onChange={(e)=>setPriority(e.target.value)}>
          <option value="" disabled selected>
            Priority
          </option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
        </select>
        <button
          type="submit"
          className="text-white border border-md px-4 py-2 rounded-md hover:bg-blue-700 transition"
          style={{ backgroundColor: "#004740" }}
        >
          Add Task
        </button>
      </form>
      <div className="w-full mt-10">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg overflow-y-auto max-h-[500px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-center">S.No</th>
                <th className="p-3 text-center">Select</th>
                <th className="p-3 text-center">Task</th>
                <th className="p-3 text-center">Assigned To</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Reassign</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="p-1 text-center">{index + 1}</td>
                  <td className="p-1 text-center">
                    <input
                      type="checkbox"
                      name={`checkbox${index}`}
                      checked={selectedTasks[index] || false}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="p-1 text-center">{task.Task}</td>
                  <td className="p-1 text-center">{task.TaskAssignedto}</td>
                  <td className="p-1 text-center">
                    <select
                      name="status"
                      value={task.status}
                      onChange={(e) => handleStatusChange(e, task)}
                    >
                      <option value="Yet to Start">Yet to Start</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="p-1 text-center">
                    {selectedTasks[index] && (
                      <select
                        onChange={(e) =>
                          handleAssigneeChange(index, e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="Govind">Govind</option>
                        <option value="Sai Rama Krishna">
                          Sai Rama Krishna
                        </option>
                        <option value="Sunil">Sunil</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button onClick={handleSaveChanges} className="mt-4">
        Save Changes
      </button>
    </div>
  );
}

export default FormtooSheet;
