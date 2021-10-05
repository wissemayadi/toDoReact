import {useState}  from 'react'
import Task from './task'

const Tasks = ({tasks,onDelete,onToogle}) => {
    
    
    return (
        <>
            {tasks.map((task,index)=>(
            // <h1 key={task.id}>{task.text}</h1>
            <Task key={index} task={task} onDelete={onDelete}
            onToogle={onToogle}
            />
            ))}
        </>
    )
}

export default Tasks
