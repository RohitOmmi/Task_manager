

import React, { useState, useEffect } from "react";

function FormtoSheet() {
  const [tasks, setTasks] = useState([]);
//   console.log(tasks)
  const [status, setStatus] = useState("Yet to Start");

  // Fetch data from Google Sheets
  const url =
    "https://script.google.com/macros/s/AKfycbyAvn5VUgrEUgdJhALb1o_8hWGFD30YWFdBm136TVz5STriW99Cwwjm-uRqepK9SzTwzQ/exec";
  const fetchData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data,"api")
        // Ensure completed tasks are properly filtered
        const filteredTasks = data.filter((task) => task.Status !== "Completed");
        console.log(filteredTasks,"filter")
        setTasks(filteredTasks);
      })
      .catch((error) => console.log("Error fetching data:", error));
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const url =
      "https://script.google.com/macros/s/AKfycbwE3Fino0q6wwjG-gC9ufuHlhUMnIbO4UZA2ggNRYtfgPjwLtOwK1AeaxIgosZPBA696A/exec";
    const formData = new URLSearchParams();
    formData.append("RequestRaisedBy", e.target.requestRaised.value);
    formData.append("Task", e.target.name.value);
    formData.append("Comments", e.target.Comments.value);
    formData.append("TaskAssignedto", e.target.task_assigned.value);
    formData.append("priority", e.target.priority.value);
    formData.append("status", status);

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
      })
      .catch((error) => console.log(error));
  };

  // Handle status update
//   const handleStatusChange = (e, task) => {
//     const newStatus = e.target.value;
//     const newComment = prompt("Add a comment (optional):") || "";
  
//     const url =
//       "https://script.google.com/macros/s/AKfycbwE3Fino0q6wwjG-gC9ufuHlhUMnIbO4UZA2ggNRYtfgPjwLtOwK1AeaxIgosZPBA696A/exec";
  
//     const formData = new URLSearchParams({
//       Task: task.Task,
//       status: newStatus,
//       Comments: newComment,
//       update: "true",
//     });
  
//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: formData.toString(),
//     })
//       .then((res) => res.text())
//       .then(() => {
        
//         fetchData();
//       })
//       .catch((error) => console.log(error));
//   };
const handleStatusChange = (e, task) => {
    const newStatus = e.target.value;
    const newComment = prompt("Add a comment (optional):") || "";
  
    const url =
      "https://script.google.com/macros/s/AKfycbyAvn5VUgrEUgdJhALb1o_8hWGFD30YWFdBm136TVz5STriW99Cwwjm-uRqepK9SzTwzQ/exec";
  
    const formData = new URLSearchParams({
      ID: task.ID,  // Pass the unique ID of the task
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
      .then((res) => res.text())
      .then(() => {
        fetchData(); // Refresh the data
      })
      .catch((error) => console.log(error));
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
        <select name="task_assigned" required className="border rounded-md p-2">
          <option>Assigned To</option>
          <option value="Govind">Govind</option>
          <option value="Sai Rama Krishna">Sai Rama Krishna</option>
          <option value=" Sunil">Sunil</option>
          <option value="Kanaka">Kanaka</option>
          <option value="Bangaru Naidu">Bangaru Naidu</option>
          <option value=" Durga">Durga</option>
          <option value="Swetha">Swetha</option>
          <option value="Devi">Devi</option>
          <option value="Dhana Lakshmi">Dhana Lakshmi</option>
          <option value="Rohit">Rohit</option>
        </select>
        <select name="priority" required className="border rounded-md p-2">
          <option>Priority</option>
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

      {/* Task Table */}
      <div className="w-full mt-10">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg overflow-y-auto max-h-[500px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-center">S.No</th>
                <th className="p-3 text-center">Task</th>
                <th className="p-3 text-center">Assigned To</th>
                <th className="p-3 text-center">Priority</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Comments</th>
              </tr>
            </thead>
            <tbody>
            {tasks.map((task, index) => (
  <tr key={task.ID} className="border-t hover:bg-gray-100 transition">
    <td className="p-1 text-center">{index + 1}</td>
    <td className="p-1 text-center">{task.Task}</td>
    <td className="p-1 text-center">{task.TaskAssignedto}</td>
    <td className="p-1 text-center">{task.priority}</td>
    <td className="p-1 text-center">
      <select
        value={task.status}
        onChange={(e) => handleStatusChange(e, task)}
        className="border rounded-md p-1"
      >
        <option value="Yet to Start">Yet to Start</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </td>
    <td className="p-1 text-center">
      {task.Comments || "No Comments"}
    </td>
  </tr>
))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FormtoSheet;

