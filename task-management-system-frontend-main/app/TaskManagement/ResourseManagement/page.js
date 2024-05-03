"use client";
import React, { useState ,useEffect} from 'react';
import UnclaimedTaskTable from '@/components/Admin/UnclaimedTaskTable';
import BusyUsers from '@/components/Admin/BusyUsers';
import FreeUsers from '@/components/Admin/FreeUsers';

import PieChart from "@/components/Admin/Piechart";
import AllDonetasks from '@/components/Admin/AllDoneTasks';
import AllPendingTasks from '@/components/Admin/AllPendingTasks';
import Link from 'next/link';

const Page = () => {
  const [selectedComponent, setSelectedComponent] = useState('unclaimed-tasks');
  var [category,setCategory]=useState(0);

  const handleDropdownChange = (e) => {
    setSelectedComponent(e.target.value);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'unclaimed-tasks':
        return <UnclaimedTaskTable />;
      case 'All-Completed-Tasks':
        return <AllDonetasks />;
      case 'All-Pending-Task':
        return <AllPendingTasks/>;
      case 'free-users':
        return <FreeUsers />;
      case 'busy-users':
        return <BusyUsers />;
      default:
        return <UnclaimedTaskTable />;
    }
  };
  useEffect(() => {
    let newCategory;
    switch (selectedComponent) {
      case 'unclaimed-tasks':
      case 'All-Completed-Tasks':
      case 'All-Pending-Task':
        newCategory = 0;
        break;
      case 'free-users':
      case 'busy-users':
        newCategory = 1;
        break;
      default:
        newCategory = 0;
    }
    setCategory(newCategory);
  }, [selectedComponent]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center text-3xl font-semibold text-gray-900 mb-10">Resource Management System</h1>

      <div className="flex justify-end px-4 mb-4">
        <select
          className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleDropdownChange}
          value={selectedComponent}
        >
          <option value="unclaimed-tasks">All Unclaimed Tasks</option>
          <option value="All-Pending-Task">All Pending Task</option>
          <option value="All-Completed-Tasks">All Completed Tasks</option>
          <option value="free-users">Free Users</option>
          <option value="busy-users">Busy Users</option>
        </select>
        <Link
          href={`/TaskManagement`}
        >
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-3">
            View Tasks
          </button>
        </Link>
      </div>
      <PieChart val={category} />
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Page;
