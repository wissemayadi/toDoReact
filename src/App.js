import {useState,useEffect}  from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import './App.css';
import Header from './components/header'
import Footer from './components/footer';
import About from './components/about';
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
//fetch tasks
const fetchTasks=async()=>{
  const res=await fetch(' http://localhost:5000/tasks');
  const data= await res.json()
  console.log(data)
 return data
}
// fecth one task
const fetchTask=async(id)=>{
  const res=await fetch(`http://localhost:5000/tasks/${id}` );
  const data= await res.json()
  console.log(data)
 return data
}


//add task

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

const toogleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask),
  })

  const data = await res.json()

  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task
    )
  )
}

  return (
    <Router>
    <div className='container'>
      <Header onAdd={()=>setShowAddTask(!showAddTask)}
      showAdd={showAddTask} />

      
      <Route path='/' exact render={(props)=>
      <>   
      {showAddTask &&  <AddTask onAdd={addTask}  />}
     {tasks.length > 0 ? (<Tasks tasks={tasks} 
     onDelete={deleteTask} 
     onToogle={toogleReminder} />) :( 'No task to show')} 
      </>
      }/>
     <Route path='/about' component={About}/>
   <Footer/>
    </div>
    </Router>
  );
}

export default App;
