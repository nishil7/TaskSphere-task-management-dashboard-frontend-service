"use server";
import ClaimedButton from "./ClaimedButton";
import PriorityStatus from "./PriorityStatus";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function TaskCard({ taskId }) {
  var task, response;
  const myHeaders = new Headers();
  const cookieStore = cookies()
  const token=cookieStore.get('authToken');
  myHeaders.append('Content-Type','application/json');
  myHeaders.append('Authorization',`${token.value}`);
  const requestOptions = {
    headers: myHeaders,
    method: "GET",
    redirect: "follow"
  };
  try {
    response = await fetch(`http://localhost:8080/user/taskManagement/claimList/getTaskById/${taskId}`, requestOptions);
    task = await response.json();
  } catch (error) {
    console.error("Error fetching Task:", error);
  }
  if(response.status == 401){
    redirect("/login");
  }
  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 py-4 text-gray-600 md:px-8 border-2 border-orange-400">
        <div className="flex flex-col md:flex-row">
          <h1 className="text-gray-500 font-semibold py-6 inline-block w-5/12">
            TASK ID : <span className="py-6 font-semibold text-orange-400">{task.tasksID}</span>
          </h1>
          <div>
            <p className=" px-8 py-6 text-orange-400 font-semibold w-full">
              {task.taskName}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <h1 className="text-gray-500 font-semibold py-6 inline-block w-5/12">
            TASK DESCRIPTION
          </h1>
          <div>
            <p className=" px-8 py-6 text-orange-400 font-semibold w-full">
              {task.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <h1 className="text-gray-500 font-semibold py-6 inline-block w-5/12">
            PRIORITY
          </h1>
          <div>
            <p className=" px-8 py-6 text-orange-400 font-semibold w-full">
              <PriorityStatus priorityID={task.priorityID} />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <ClaimedButton taskId={taskId}/>
        </div>
      </div>
    </main>
  );
}
