// useFetchClaimedTask.js
"use client"
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { assignTask } from "@/lib/UserState";
import Cookies from 'js-cookie';


const useFetchClaimedTask = (callback) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const token=Cookies.get('authToken');
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('Authorization',`${token}`);
  const requestOptions = {
    headers: myHeaders,
    method: "GET",
    redirect: "follow",
    cache: "no-store",
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          "http://localhost:8080/user/taskManagement/claimList/getClaimedTask",
          requestOptions
        );

        if (result.ok) {
          try {
            const response = await result.json();
            dispatch(assignTask(response.tasksID));
            setLoading(false); // Set loading to false after data is fetched

          } catch (error) {
            dispatch(assignTask("-1"));
            setLoading(false); // Set loading to false on error
          }
        } else {
          window.alert("Error: Failed to make the GET request");
          setLoading(false); // Set loading to false on fetch failure
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on fetch error
      }
    };

    fetchData();
  }, [dispatch]);

  return { loading }; // Return the loading state
};

export default useFetchClaimedTask;
