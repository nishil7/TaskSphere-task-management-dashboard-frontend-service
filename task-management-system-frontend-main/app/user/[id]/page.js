import TaskCard from "../../../components/claim_list/TaskCard";
import React from "react";

export default function page({ params }) {
  return (
    <>
      <TaskCard taskId={params.id}/>
    </>
  );
}
