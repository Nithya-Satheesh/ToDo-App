import React,{ useState } from 'react'
import './App.css'

function App() {
  
const currentDate = new Date();
const options = { weekday: 'long' };
const dayOfWeek = currentDate.toLocaleDateString(undefined, options);

const[toDos,settoDos] = useState([]);
const[toDo,settoDo] = useState('');

const [open, setOpen] = React.useState(false);

const handleOpen = () => {
  setOpen(!open);
};

const completedTasks = toDos.filter((task) => task.status);

  return (
    <div className='app'>
      <h1 className='heading'>My ToDo List</h1>
      <div className='subHeading'>
        <h2 className='day'>For {dayOfWeek}</h2>
        <br/>
        <div className='input'>
          <input value={toDo} onChange={(e)=>settoDo(e.target.value)}type="text" id="myInput" className="small-box" placeholder='Add your new ToDo...'/>
          <div className='add'>
            <i onClick={()=>settoDos([...toDos,{id:Date.now(),text: toDo,status:false}])} className="fa fa-plus-square" aria-hidden="true"></i>
          </div>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>



        <div className='todos'>
        <h2 className='active'>Active Tasks</h2>
         { toDos.map((obj)=>{
          return(
          <div className='todo'>
            <div className='left'>
              <input onChange={(e)=>{
                console.log(e.target.checked)
                settoDos(toDos.filter(obj2=>{
                  if(obj2.id==obj.id){
                    obj2.status=e.target.checked
                  }
                  return obj2
                }))
              }}  
              value={obj.status} type="checkbox" id="myCheckbox" name="myCheckbox" className='checkbox'/>
              <p>{obj.text}</p>

              <i onClick={(e)=>{settoDos(toDos.filter(obj2=>{
                return obj2.id !==obj.id;}))}}
               className="fa fa-times"></i>
            </div> 
          </div>)
          })}
        </div>
        <br/>
        <br/>

 <div className='completed'>
  <h2 className='subsubheading'>Completed Tasks</h2>
  <i onClick={handleOpen} className="fa fa-angle-down"></i>
  {open ? (
    <div>
      {completedTasks.map((task) => (
        <div className='completedtodo' key={task.id}>
          <div className='left'>
            <p>{task.text}</p> 
          </div>
        </div>
      ))}
    </div>
  ) : null}
</div>
          

      </div>
    </div>
  )
}

export default App
