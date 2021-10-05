import {FaTimes} from 'react-icons/fa'
import React from 'react'

const Task = ({task,onDelete,onToogle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder':''}`}
        
        onDoubleClick={()=>onToogle(task.id)}>
            <h3>{task.text}<FaTimes style={{color:'red',cursor:'pointer'}} onClick={()=>onDelete(task.id)}/></h3>
            <p>{task.day}</p>
            
        </div>
    )
}

export default Task
