import {useState,useEffect}  from 'react'
import './App.css';
import Header from './components/header'
import Tasks from './components/tasks'
import AddTask  from './components/addTask';
function App() {
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks,setTasks]=useState([])

  useEffect(()=>{
 const getTasks = async () => {
   const tasksFromServer= await fetchTasks()
   setTasks(tasksFromServer)

 }
  getTasks()
  },[])
//fetch data
const fetchTasks=async()=>{
  const res=await fetch(' http://localhost:5000/tasks');
  const data= await res.json()
  console.log(data)
 return data
}

//add task

// const addTask=(task)=>{ 
// const id =Math.floor(Math.random() * 10000) +1
// console.log(id)

// const newTask={id,...task}
// setTasks([...tasks,newTask])
const addTask=async(task)=>{
const res= await fetch('http://localhost:5000/tasks',{
  method:'POST',
  headers:{
    'Content-type':'application/json'
  },
  body:JSON.stringify(task)

}
)
const data = await res.json()
setTasks([...tasks,data])
}





//delete task

const deleteTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })
  //We should control the response status to decide if we will change the state or not.
  res.status === 200
    ? setTasks(tasks.filter((task) => task.id !== id))
    : alert('Error Deleting This Task')
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
