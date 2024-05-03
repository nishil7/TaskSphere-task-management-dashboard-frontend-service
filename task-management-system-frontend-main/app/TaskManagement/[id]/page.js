import EditTask from '@/components/Admin/EditTask'
import React from 'react'
function page({params}) {
  
  return (
    <div>
        <EditTask taskId={params.id}/>
    </div>
  )
}

export default page
