// import React, { useState, useEffect } from "react";

// function FormToSpreadSheet() {
//   const [tasks, setTasks] = useState([]);

//   const fetchData = () => {
//     const url =
//       "https://script.google.com/macros/s/AKfycbySc2fL3t_PoovhQB0J9Q6dOIEo6iLyBagD6MXXaykoQpVzUo-NBfDhdFC1ntQjuQia/exec";
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         const filteredTasks = data.filter((task) => task.status !== "Completed");
//         setTasks(filteredTasks);
//       })
//       .catch((error) => console.log("Error fetching data:", error));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const url =
// //       "https://script.google.com/macros/s/AKfycbyu1yFyuYXdGoubTlcqpz5i06rwJ6Ak26zaa_0Oq-BapOo1duIsw0nHmt6SjxM5WzoY/exec";
// //     const formData = new URLSearchParams();
// //     formData.append("RequestRaisedBy", e.target.RequestRaisedBy.value);
// //     formData.append("Task", e.target.name.value);
// //     formData.append("Comments", e.target.Comments.value);
// //     formData.append("TaskAssignedto", e.target.task_assigned.value);
// //     formData.append("Priority", e.target.priority.value);
// //     formData.append("status", "Yet to Start"); // Default status

// //     fetch(url, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
// //       body: formData.toString(),
// //     })
// //       .then((res) => res.text())
// //       .then((data) => {
// //         alert(data);
// //         fetchData(); // Refresh data
// //         e.target.reset();
// //       })
// //       .catch((error) => console.log(error));
// //   };

// const handleSubmit = (e) => {
//     e.preventDefault();
//     const url =
//       "https://script.google.com/macros/s/AKfycbySc2fL3t_PoovhQB0J9Q6dOIEo6iLyBagD6MXXaykoQpVzUo-NBfDhdFC1ntQjuQia/exec";
//     const formData = new URLSearchParams();
    
//     // ✅ Ensure correct field names are used
//     formData.append("RequestRaisedBy", e.target.RequestRaisedBy.value); 
//     formData.append("Task", e.target.name.value);
//     formData.append("Comments", e.target.Comments.value);
//     formData.append("TaskAssignedto", e.target.task_assigned.value);
//     formData.append("Priority", e.target.priority.value);
//     formData.append("status", "Yet to Start"); // Default status
  
//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: formData.toString(),
//     })
//       .then((res) => res.text())
//       .then((data) => {
//         alert(data);
//         fetchData(); // Refresh data
//         e.target.reset();
//       })
//       .catch((error) => console.log(error));
//   };
  
//   return (
//     <div className="w-full h-screen bg-gradient-to-r from-[#F4E4C9] to-[#CCBA8D] p-10 flex flex-col items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-lg p-6 flex flex-wrap gap-4 w-full items-center"
//       >
//         <input
//            name="RequestRaisedBy" type="text" 
//           placeholder="Request Raised By"
//           required
//           className="flex-1 p-2 border rounded-md focus:outline-blue-400"
//         />
//         <input
//           name="name"
//           type="text"
//           placeholder="Task Name"
//           required
//           className="flex-1 p-2 border rounded-md focus:outline-blue-400"
//         />
//         <input
//           name="Comments"
//           type="text"
//           placeholder="Comments"
//           className="flex-1 p-2 border rounded-md focus:outline-blue-400"
//         />
//         <select name="task_assigned" required className="border rounded-md p-2">
//           <option value="">Assigned To</option>
//           <option value="Govind">Govind</option>
//           <option value="Sai Rama Krishna">Sai Rama Krishna</option>
//           <option value="Sunil">Sunil</option>
//           <option value="Kanaka">Kanaka</option>
//           <option value="Bangaru Naidu">Bangaru Naidu</option>
//           <option value="Durga">Durga</option>
//           <option value="Swetha">Swetha</option>
//           <option value="Devi">Devi</option>
//           <option value="Dhana Lakshmi">Dhana Lakshmi</option>
//           <option value="Rohit">Rohit</option>
//         </select>
//         <select name="priority" required className="border rounded-md p-2">
//           <option value="">Priority</option>
//           <option value="P1">P1</option>
//           <option value="P2">P2</option>
//           <option value="P3">P3</option>
//         </select>
//         <button
//           type="submit"
//           className="text-white border border-md px-4 py-2 rounded-md bg-[#004740] hover:opacity-80 transition"
//           style={{ backgroundColor: "#004740" }}
//         >
//           Add Task
//         </button>
//       </form>

//       {/* Display fetched tasks */}
//       <div className="mt-6 w-full max-w-3xl">
//         <h2 className="text-lg font-semibold mb-2">Tasks</h2>
//         <ul className="bg-white shadow-md rounded-lg p-4">
//           {tasks.length > 0 ? (
//             tasks.map((task, index) => (
//               <li key={index} className="border-b py-2">
//                 {task.Task} - <strong>{task.status}</strong>
//               </li>
//             ))
//           ) : (
//             <p>No tasks available</p>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }


// export default FormToSpreadSheet;
import React, { useState, useEffect } from "react";

function FormToSpreadSheet() {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxwERA0Qj0UkdMiThzx9mtEpcE1GLo2i5K__NfswBgKIW5YLEMRq1H5r05LYqmyVoVI/exec");
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Fetched Tasks:", data);
      setTasks(data); // Update state with fetched tasks
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "https://script.google.com/macros/s/AKfycbxwERA0Qj0UkdMiThzx9mtEpcE1GLo2i5K__NfswBgKIW5YLEMRq1H5r05LYqmyVoVI/exec";
    const formData = new URLSearchParams();

    formData.append("RequestRaisedBy", e.target.RequestRaisedBy.value);
    formData.append("Task", e.target.name.value);
    formData.append("Comments", e.target.Comments.value);
    formData.append("TaskAssignedto", e.target.task_assigned.value);
    formData.append("Priority", e.target.priority.value);
    formData.append("status", "Yet to Start");
    console.log(formData)
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        fetchData();
        e.target.reset();
      })
      .catch((error) => console.log(error));
  };

  const updateTask = (task, newStatus, newComment) => {
    const url = "https://script.google.com/macros/s/AKfycbxwERA0Qj0UkdMiThzx9mtEpcE1GLo2i5K__NfswBgKIW5YLEMRq1H5r05LYqmyVoVI/exec";
    const formData = new URLSearchParams();

    formData.append("task", task.task);
    formData.append("taskAssignedTo", task.taskAssignedTo);
    formData.append("status", newStatus);
    formData.append("adminComments", newComment);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    })
      .then(() => fetchData())
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#F4E4C9] to-[#CCBA8D] p-10 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 flex flex-wrap gap-4 w-full items-center"
      >
        <input
          name="RequestRaisedBy"
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
          <option value="">Assigned To</option>
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
        <select name="priority" required className="border rounded-md p-2">
          <option value="">Priority</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
        </select>
        <button
          type="submit"
          className="text-white border border-md px-4 py-2 rounded-md bg-[#004740] hover:opacity-80 transition"
          style={{ backgroundColor: "#004740" }}
        >
          Add Task
        </button>
      </form>

      {/* Task Table */}
      <div className="w-full h-screen p-10 flex flex-col items-center ">
        <div className="w-full mt-10">
          <div className="overflow-x-auto bg-white shadow-md rounded-lg max-h-[500px]">
                <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="p-3 text-center">S.No</th>
                    <th  className="p-3 text-center">Task</th>
                    <th  className="p-3 text-center">Assigned To</th>
                    <th  className="p-3 text-center">Status</th>
                    <th  className="p-3 text-center">Admin Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <tr key={index} className="border">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{task.task}</td>
                        <td className="p-2">{task.taskAssignedTo}</td>
                        <td className="p-2">
                            <select
                            value={task.status}
                            onChange={(e) => updateTask(task, e.target.value, task.adminComments)}
                            className="border p-1"
                            >
                            <option value="Yet to Start">Yet to Start</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            </select>
                        </td>
                        <td className="p-2">
                            {task.status === "In Progress" ? (
                            <input
                                type="text"
                                defaultValue={task.adminComments}
                                onBlur={(e) => updateTask(task, task.status, e.target.value)}
                                className="border p-1 w-full"
                            />
                            ) : (
                            task.adminComments
                            )}
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="5" className="text-center p-4">
                        No tasks available
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormToSpreadSheet;

