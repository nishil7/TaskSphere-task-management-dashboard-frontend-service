import Link from "next/link";
import PriorityStatus from "./PriorityStatus";

export default function TaskList({ taskList, type }) {
  let tableHeading = "Available Task";
  let tableDescription =
    type === "assigned"
      ? `Number of Assigned Task: ${Object.keys(taskList).length}`
      : "You can select any of the following task.";

  if (type === "assigned") {
    tableHeading = Object.keys(taskList).length === 0 ? "No Assigned Task" : `Assigned Task: ${Object.keys(taskList).length}`;
  }

  if (type === "available") {
    taskList = Object.values(taskList); // Convert object values to an array
    taskList.sort((a, b) => {
      const priorityA = a.priorityID;
      const priorityB = b.priorityID;
      if (priorityA < priorityB) {
        return -1;
      }
      if (priorityA > priorityB) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="max-w-screen-xl mx-auto px-12 md:px-8 py-5">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            {tableHeading}
          </h3>
          {type === "available" && (
            <p className="text-gray-600 mt-2">
              {tableDescription}
            </p>
          )}
        </div>
      </div>
      {Object.keys(taskList).length !== 0 && (
        <div className="mt-12 relative h-max overflow-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-orange-400 font-medium border-b">
              <tr>
                <th className="py-3 pr-6 w-1/5">Task Id</th>
                <th className="py-3 pr-6 text-center max-w-[40%]">Task Title</th>
                <th className="py-3 pr-6 text-center w-1/5">Task Priority</th>
                <th className="py-3 px-4 text-right w-1/5">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {taskList.map((task) => (
                <tr key={task.tasksID}>
                  <td className="px-4 py-4 w-1/5 whitespace-nowrap">{task.tasksID}</td>
                  <td className="pr-6 py-4 text-center max-w-[40%] whitespace-nowrap">{task.taskName}</td>
                  <td className="pr-6 py-4 text-center whitespace-nowrap"><PriorityStatus priorityID={task.priorityID} /></td>
                  <td className="text-right whitespace-nowrap">
                    <Link href={`/user/${task.tasksID}`} className="py-1.5 px-6 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                      View Task
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}