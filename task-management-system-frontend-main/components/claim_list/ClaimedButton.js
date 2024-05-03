"use client";
import { useAppSelector } from "@/lib/hooks";
import { assignTask } from "@/lib/UserState";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import useFetchClaimedTask from "./useFetchClaimedTask";
import Cookies from 'js-cookie';

const handleSubmit = async (dispatch, taskId, status, assignedTaskId) => {
  var response, raw, requestOptions;
  const token=Cookies.get('authToken');
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('Authorization',`${token}`);
  try {
    switch (status) {
      case 0:
        raw = JSON.stringify({
          tasksId: assignedTaskId,
          isActive: 1,
        });
        requestOptions = {
          method: "PATCH",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        response = await fetch(
          "http://localhost:8080/user/taskManagement/claimList/unclaimTask",
          requestOptions
        );
        break;
      case 1:
        raw = JSON.stringify({
          tasksId: taskId,
          isActive: 1,
        });
        requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        response = await fetch(
          "http://localhost:8080/user/taskManagement/claimList/claimTask",
          requestOptions
        );
        break;
      case 2:
        raw = JSON.stringify({
          tasksId: assignedTaskId,
          isActive: 1,
        });
        requestOptions = {
          method: "PATCH",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        response = await fetch(
          "http://localhost:8080/user/taskManagement/claimList/askForApprovalTask",
          requestOptions
        );
        break;
      default:
        window.alert("Wrong Status");
    }
    if (response.ok) {
      dispatch(assignTask(taskId));
    } else {
      window.alert("Error: Failed to make the POST request");
    }
  } catch (error) {
    console.error("Error:", error);
    window.alert(error);
  }
};
const DisableButton = ({ buttonText }) => {
  return (
    <button className="w-5/12 px-4 py-2 text-white font-medium bg-orange-400 opacity-50 cursor-not-allowed rounded-lg duration-150">
      {buttonText}
    </button>
  );
};
const ActiveButton = ({ buttonText, taskId, status, assignedTaskId }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  console.log("Active Button");
  return (
    <button
      onClick={() => {
        if (status === 2) {
          console.log("ask");
          router.push("/user");
        }
        handleSubmit(dispatch, taskId, status, assignedTaskId);
      }}
      className="w-5/12 px-4 py-2 text-white font-medium bg-orange-400 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150 mx-8"
    >
      {buttonText}
    </button>
  );
};
const ClaimedButton = ({ taskId }) => {
  const { loading } = useFetchClaimedTask(() => {
    console.log("Data fetched and state updated!");
  });
  const assignedTaskNumber = useAppSelector((state) => state.assignTask);
  console.log(assignedTaskNumber);
  return (
    <>
      {assignedTaskNumber === "-1" && (
        <ActiveButton buttonText={"CLAIM"} taskId={taskId} status={1} />
      )}

      {assignedTaskNumber == taskId && (
        <>
          <ActiveButton
            buttonText={"UNCLAIM"}
            taskId={"-1"}
            status={0}
            assignedTaskId={taskId}
          />
          <ActiveButton
            buttonText={"Ask for Approval"}
            taskId={"-1"}
            status={2}
            assignedTaskId={taskId}
          />
        </>
      )}
      {assignedTaskNumber !== "-1" && assignedTaskNumber != taskId && (
        <>
          <ActiveButton
            buttonText={`UNCLAIM TASK : ${assignedTaskNumber}`}
            taskId={"-1"}
            status={0}
            assignedTaskId={assignedTaskNumber}
          />
          <DisableButton buttonText={"You have Already Claimed Task"} />
        </>
      )}
    </>
  );
};
export default ClaimedButton;
