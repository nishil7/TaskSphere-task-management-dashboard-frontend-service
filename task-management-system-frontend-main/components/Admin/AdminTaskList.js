import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PriorityStatus from '../claim_list/PriorityStatus';
import Cookies from 'js-cookie';

function AdminTaskList({filterStatus, filterPriority }) {
    const [taskList, setTaskList] = useState([]);
    const height = taskList.length !== 0 ? "h-60" : "h-28";


    useEffect(() => {
        const fetchTaskList = async () => {
          try {
            const token=Cookies.get('authToken');
            const response = await fetch(`http://localhost:8080/admin/taskManagement/${filterStatus}/${filterPriority}`,
            {
              method: 'GET',
              headers: {
                  'Authorization': `${token}`,
                  'Content-Type': 'application/json',
              },
          }
            );
            const data = await response.json();
            setTaskList(data);
            console.log(taskList);
          } catch (error) {
            console.error('Error fetching Tasks:', error);
          }
        };
    
        fetchTaskList();
      }, [filterStatus, filterPriority]);

  return (
    <div>
      <>
      <div className={`max-w-screen-xl mx-auto px-12 md:px-8 ${height} py-5`}>
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              All Tasks
            </h3>
            <p className="text-gray-600 mt-2">
              List of Tasks
            </p>
          </div>
        </div>
       

        <div className="mt-12 relative h-max overflow-auto">


          <table className="w-full table-auto text-sm text-left">
            <thead className="text-orange-400 font-medium border-b">
              <tr>
                <th className="py-3 pr-6">Task Id</th>
                <th className="py-3 pr-6">Task Title</th>
                <th className="py-3 pr-6">Task Status</th>
                <th className="py-3 pr-6">Task Priority</th>
                <th className="py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 divide-y">

              {Array.isArray(taskList) && taskList.map((task)=> (
                <tr key={task.tasksID}>
            

                  <td className="pr-6 py-4 whitespace-nowrap">{task.tasksID}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">{task.taskName}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">

                    <span
                      className={`px-3 py-2 rounded-full font-semibold text-xs ${task.statusID == 4
                        ? "text-green-600 bg-green-50"
                        : "text-red-600 bg-blue-50"
                        }`}
                    >

                      {task.statusID == 1 ? "Available" : (task.statusID == 2 ? "In Progress" : (task.statusID == 3 ? "Pending" : "Done"))}
                    </span>
                  </td>

                  <td className="pr-6 py-4 whitespace-nowrap">

                  <PriorityStatus priorityID={task.priorityID} />
                  </td>

                  <td className="text-center whitespace-nowrap ">

                    <Link
                      href={`/TaskManagement/${task.tasksID}`}
                      className="py-1.5 px-6 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                    >
                      Edit Task
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </>
    </div>
  );
}

export default AdminTaskList;