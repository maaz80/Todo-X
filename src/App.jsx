import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState()

  const togglecheckbox = () => {
    setshowfinished(!showfinished)
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      try {
        let todos = JSON.parse(todoString)
        setTodos(todos);
      } catch (error) {
        console.error("Error parsing todos from local storage:", error);
      }
    }
  }, []);

  let loc = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    console.log("Todos saved to local storage:", todos);
  }


  const handleDelete = (e, id) => {
    const confirmed = confirm("Do You want to delete this todo?")
    if (confirmed) {
      let newTodos = todos.filter(item => {
        return item.id !== id;
      })
      setTodos(newTodos)
      loc(newTodos);
    }
  }

  const handleSave = () => {
    // Create a new todo object
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodo];
      loc(updatedTodos);
      return updatedTodos;
    });
    setTodo("");
  }


  const handleEdit = (e, id) => {
    const confirmed = confirm("Do You want to edit this todo?")
    if (confirmed) {
      let t = todos.filter(i => i.id === id)
      setTodo(t[0].todo)
      let newTodos = todos.filter(item => {
        return item.id !== id;
      })
      setTodos(newTodos)
      loc(newTodos);
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    loc();
  }

  return (
    <>
      <div className=" w-full h-full pb-9 md:pb-[53px]">
        <Navbar />
        <div className="container bg-gray-400 my-5 mx-auto rounded-md min-h-[80vh] md:w-[60vw] w-[90%] shadow-3xl border border-black ">

          {/* Type bar */}
          <div>
            <h1 className='text-center font-bold font-mono text-lg underline'>Add your Todo's Now</h1>

            <div className="flex justify-center py-5">
              <input onChange={handleChange} value={todo} className='border  border-black p-1  rounded-md w-2/4 font-serif shadow-2xl' type="text" placeholder='Your todo here..' />
              <button disabled={todo.length <= 3} onClick={handleSave} className='bg-slate-600 px-4  rounded-md border border-black text-white disabled:bg-slate-300 font-serif ml-1 shadow-3xl' >Save</button>
            </div>
          </div>

          {/* Yur saved todos */}
          <h2 className='text-center font-bold font-mono text-lg underline'>Your todos</h2>
          <div className='flex gap-2 md:ml-[26%] ml-[4.5%] justify-start underline font-mono font-semibold'>
            <input onChange={togglecheckbox} type="checkbox" name="" id="" checked={showfinished} /><div>Show Finished</div>
          </div>
          <div className="todos ">
            {todos.length == 0 && <div className='text-center mt-28 font-bold font-mono'>No todos to display.</div>}
            {todos.map(item => {
              return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-center my-5">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" className='me-1' />
                <div className={item.isCompleted ? "line-through" : ""} >
                  <div className='border border-black md:w-[20vw] w-[40vw] px-2 rounded-md bg-white'>{item.todo}
                  </div>
                </div>
                <div className="button max-h-6.5">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='border border-black mx-1 px-2 rounded-md text-white bg-slate-600 font-serif max-h-6.5 max-w-13'>Edit</button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='border border-black  px-2 rounded-md text-white bg-slate-600 font-serif max-w-18 max-h-6.5 '>Delete</button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
