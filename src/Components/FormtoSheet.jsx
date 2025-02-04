// import React, { useState, useEffect } from "react";

// function FormtoSheet() {
//   const [tasks, setTasks] = useState([]);
//   const [status, setStatus] = useState("Yet to Start");

//   // Fetch data from Google Sheets
//   const fetchData = () => {
//     const url =
//       "https://script.google.com/macros/s/AKfycbyoLyXRBplepRxzw5w96kd73lrM1X0cDUB62h06HOjRxdZCNWH7DRaLC1c1YbhWm8iA2A/exec";
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setTasks(data))
//       .catch((error) => console.log("Error fetching data:", error));
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const url =
//       "https://script.google.com/macros/s/AKfycbyoLyXRBplepRxzw5w96kd73lrM1X0cDUB62h06HOjRxdZCNWH7DRaLC1c1YbhWm8iA2A/exec";
//     const formData = new URLSearchParams();
//     formData.append("RequestRaisedBy", e.target.requestRaised.value);
//     formData.append("Task", e.target.name.value);
//     formData.append("Comments", e.target.Comments.value); // Include comments
//     formData.append("TaskAssignedto", e.target.task_assigned.value);
//     formData.append("priority", e.target.priority.value);
//     formData.append("status", status);

//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: formData.toString(),
//     })
//       .then((res) => res.text())
//       .then((data) => {
//         alert(data);
//         fetchData(); // Refresh data after adding a task
//         e.target.reset();
//       })
//       .catch((error) => console.log(error));
//   };

//   // Handle status update
//   const handleStatusChange = (e, taskIndex) => {
//     const newStatus = e.target.value;
//     const newComment = prompt("Add a comment (optional):") || "";

//     setTasks((prevTasks) => {
//       const updatedTasks = [...prevTasks];
//       updatedTasks[taskIndex] = {
//         ...updatedTasks[taskIndex],
//         status: newStatus,
//         Comments: newComment, // Store comment locally
//       };
//       return updatedTasks;
//     });

//     const url =
//       "https://script.google.com/macros/s/AKfycbyoLyXRBplepRxzw5w96kd73lrM1X0cDUB62h06HOjRxdZCNWH7DRaLC1c1YbhWm8iA2A/exec";

//     const formData = new URLSearchParams({
//       Task: tasks[taskIndex].Task,
//       status: newStatus,
//       Comments: newComment, // Send comment along with update
//       update: "true",
//     });

//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: formData.toString(),
//     })
//       .then((res) => res.text())
//       .then((data) => {
//         console.log("Status Updated:", data);
//         fetchData(); // Refresh data after updating
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className="w-full h-screen  bg-gradient-to-r from-[#F4E4C9] to-[#CCBA8D] p-10 flex flex-col items-center">
//       {/* <h2 className=" text-[#004740] text-3xl font-bold  mb-6">Task Manager</h2> */}

//       {/* Add Task Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-lg p-6 flex flex-wrap md:flex-nowrap gap-4 w-full  items-center"
//       >
//         <div className="flex flex-wrap gap-4 flex-grow">
//           <input
//             name="requestRaised"
//             type="text"
//             placeholder="Request Raised By"
//             required
//             className="flex-1 p-2 border rounded-md focus:outline-blue-400"
//           />
//           <input
//             name="name"
//             type="text"
//             placeholder="Task Name"
//             required
//             className="flex-1 p-2 border rounded-md focus:outline-blue-400"
//           />
//           <input
//             name="Comments"
//             type="text"
//             placeholder="Comments"
//             className="flex-1 p-2 border rounded-md focus:outline-blue-400"
//           />
//           <select
//             name="task_assigned"
//             required
//             className="border rounded-md p-2"
//           >
//             <option>Assigned To</option>
//             <option value="Govind">Govind</option>
//             <option value="Sai Rama Krishna">Sai Rama Krishna</option>
//             <option value=" Sunil">Sunil</option>
//             <option value="Kanaka">Kanaka</option>
//             <option value="Bangaru Naidu">Bangaru Naidu</option>
//             <option value=" Durga">Durga</option>
//             <option value="Swetha">Swetha</option>
//             <option value="Devi">Devi</option>
//             <option value="Dhana Lakshmi">Dhana Lakshmi</option>
//             <option value="Rohit">Rohit</option>
//           </select>
//           {/* <input
//             name="priority"
//             type="text"
//             placeholder="Priority"
//             required
//             className="flex-1 p-2 border rounded-md focus:outline-blue-400"
//           /> */}
//           <select name="priority" required className="border rounded-md p-2">
//             <option>Priority</option>
//             <option value="P1">P1</option>
//             <option value="P2">P2</option>
//             <option value="P3">P3</option>
//           </select>
//           {/* <input
//             name="date"
//             type="date"
//             required
//             className="border rounded-md p-2"
//           /> */}
//         </div>
//         <button
//           type="submit"
//           className=" text-white border border-md px-4 py-2 rounded-md hover:bg-blue-700 transition"
//           style={{ backgroundColor: "#004740" }}
//         >
//           Add Task
//         </button>
//       </form>
//       {/* className="  p-6 flex flex-wrap md:flex-nowrap gap-4 w-full  items-center" */}
//       {/* Task List */}
//       <div className="w-full mt-10">
//         {/* <h3 className=" text-[#004740] text-2xl font-semibold  mb-4">Task List</h3> */}
//         <div className="overflow-x-auto bg-white shadow-md rounded-lg  overflow-y-auto max-h-[500px]">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-3 text-center">S.No</th>
//                 <th className="p-3 text-center">Task</th>
//                 <th className="p-3 text-center">Assigned To</th>
//                 <th className="p-3 text-center">Priority</th>
//                 <th className="p-3 text-center">Status</th>
//                 <th className="p-3 text-center">Comments</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.length > 0 ? (
//                 tasks.map((task, index) => (
//                   <tr
//                     key={index}
//                     className="border-t hover:bg-gray-100 transition"
//                   >
//                     <td className="p-1 text-center">{index + 1}</td>
//                     <td className="p-1 text-center">{task.Task}</td>
//                     <td className="p-1 text-center">{task.TaskAssignedto}</td>
//                     <td className="p-1 text-center">{task.priority}</td>
//                     <td className="p-1 text-center">{task.status}</td>
//                     <td className="p-1 text-center">
//                       {task.Comments || "No Comments"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center p-3">
//                     No tasks available
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FormtoSheet;
import React, { useState, useEffect } from "react";

function FormtoSheet() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("Yet to Start");

  // Fetch data from Google Sheets
  const fetchData = () => {
    const url =
      "https://script.google.com/macros/s/AKfycbwE3Fino0q6wwjG-gC9ufuHlhUMnIbO4UZA2ggNRYtfgPjwLtOwK1AeaxIgosZPBA696A/exec";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Ensure completed tasks are properly filtered
        const filteredTasks = data.filter((task) => task.status !== "Completed");
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
  const handleStatusChange = (e, task) => {
    const newStatus = e.target.value;
    const newComment = prompt("Add a comment (optional):") || "";
  
    const url =
      "https://script.google.com/macros/s/AKfycbwE3Fino0q6wwjG-gC9ufuHlhUMnIbO4UZA2ggNRYtfgPjwLtOwK1AeaxIgosZPBA696A/exec";
  
    const formData = new URLSearchParams({
      taskId: task.ID, // Ensure a unique identifier is used
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
        // Refetch data to reflect the correct status and hide completed tasks
        fetchData();
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
