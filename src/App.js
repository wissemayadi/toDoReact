import {useState}  from 'react'
import './App.css';
import Header from './components/header'
import Tasks from './components/tasks'
import AddTask  from './components/addTask';
function App() {
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks,setTasks]=useState([
    {
    id:1,
    text:'doctors wissem',
    day:'26 avril 2022',
    reminder:true
    },{
    id:2,
    text:'doctors wissal',
    day:'26 mai 2022',
    reminder:true
    },{
    id:3,
    text:'doctors wissou',
    day:'26 avril 2023',
    reminder:false
    }
    
    ])
//add task

const addTask=(task)=>{ 
const id =Math.floor(Math.random() * 10000) +1
console.log(id)

const newTask={id,...task}
setTasks([...tasks,newTask])
}




//delete task
const deleteTask=(id)=>{

setTasks(tasks.filter((task)=>task.id !==id))
}
//toogle reminder
const toogleReminder=(id)=>{
setTasks(tasks.map((task)=>task.id===id ? {...task,reminder:!task.reminder}: task)
)

}

  return (
    <div className='container'>
      <Header onAdd={()=>setShowAddTask(!showAddTask)}
      showAdd={showAddTask} />
      {showAddTask &&  <AddTask onAdd={addTask}  />}
     {tasks.length > 0 ? (<Tasks tasks={tasks} 
     onDelete={deleteTask} 
     onToogle={toogleReminder} />) :( 'No task to show')} 
    </div>
  );
}

export default App;
