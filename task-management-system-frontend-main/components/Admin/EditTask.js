"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function EditTask({ taskId }) {
  const router = useRouter();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [statusID, setStatusID] = useState(0);
  const [priorityID, setPriorityID] = useState(0);

  const myHeaders = new Headers();
  myHeaders.append("Authorization",Cookies.get('authToken'));


  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  useEffect(() => {
 
    const apiUrl = `http://localhost:8080/admin/taskManagement/${taskId}`;
    
    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        setTaskName(data.taskName);
        setDescription(data.description);
        setStatusID(data.statusID);
        setPriorityID(data.priorityID);

        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const submitForm = async () => {
    const formData = {
      taskName,
      description,
      statusID,
      priorityID,
    };

    console.log('Form Data:', formData);

    try {
      const token=Cookies.get('authToken');
      const response = await fetch(`http://localhost:8080/admin/taskManagement/editTask/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Task Updated successfully!');

      } else {
        console.error('Failed to update task. Server returned:', response);
      }
    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
    router.push("/TaskManagement");

  };


  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Edit Task</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">
            Task Name<span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="form-input mt-1 block w-full border rounded px-4 py-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">
            Description<span className="text-red-500">*</span>:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea mt-1 block w-full border rounded px-4 py-2 h-40"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">
            Status<span className="text-red-500">*</span>:
          </label>
          <select
            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-3"
            onChange={(e) => setStatusID(e.target.value)}
            value={statusID}
            required
          >
            <option value="1">Available</option>
            <option value="2">In Progress</option>
            <option value="3">Pending</option>
            <option value="4">Done</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">
            Priority<span className="text-red-500">*</span>:
          </label>
          <select
            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-3"
            onChange={(e) => setPriorityID(e.target.value)}
            value={priorityID}
            required
          >
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTask;
