"use client";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import TaskList from "@/components/claim_list/TaskList";

const getAvailableTaskList = async () => {
  const myHeaders = new Headers();
  const token=Cookies.get('authToken');
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${token}`);
  const requestOptions = {
    headers: myHeaders,
    method: "GET",
    redirect: "follow",
    cache: "no-store",
  };
  var response, availbleTaskList;
  try {
    response = await fetch(
      "http://localhost:8080/user/taskManagement/claimList/getAvailableTasks",
      requestOptions
    );
    availbleTaskList = await response.json();
  } catch (error) {
    console.error("Error fetching Tasks:", error);
  }
  if (response.status == 401) {
    redirect("/login");
  }
  return availbleTaskList;
};

const getClaimedTask = async () => {
  var response, assignedTaskList;
  const myHeaders = new Headers();
  const token=Cookies.get('authToken');
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `${token}`);
  const requestOptions = {
    headers: myHeaders,
    method: "GET",
    redirect: "follow",
    cache: "no-store",
  };
  try {
    response = await fetch(
      "http://localhost:8080/user/taskManagement/claimList/getClaimedTaskDetail",
      requestOptions
    );
    try {
      const assignedTask = await response.json();
      assignedTaskList = [assignedTask];
    } catch (error) {
      assignedTaskList = [];
    }
  } catch (error) {
    console.error("Error fetching Tasks:", error);
  }
  if (response.status == 401) {
    redirect("/login");
  }
  return assignedTaskList;
};

const UserDashboardClaimList = () => {
  const [availbleTaskList, setAvailableTaskList] = useState({});
  const [assignedTaskList, setAssignedTaskList] = useState({});
  console.log("cc");
  useEffect(() => {
    const fetchAvailableTaskList = async () => {
      console.log("aa");
      const taskData = await getAvailableTaskList();
      console.log("aa", taskData);
      setAvailableTaskList(taskData);
    };
    fetchAvailableTaskList();
  }, []);
  console.log("bb", availbleTaskList);
  useEffect(() => {
    const fetchAssignedTask = async () => {
      const taskData = await getClaimedTask();
      setAssignedTaskList(taskData);
    };

    fetchAssignedTask();
  }, []);
  console.log("dd", assignedTaskList);
  return (
    <>
      <div className="divide-y">
        <TaskList taskList={assignedTaskList} type={"assigned"} />
        <TaskList taskList={availbleTaskList} type={"available"} />
      </div>
    </>
  );
}
export default UserDashboardClaimList;