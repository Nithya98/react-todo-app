import React,{useState, useEffect} from "react"
import Todo from './Todo';
import TodoForm from './TodoForm'

const TodoList = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const localTodos = localStorage.getItem("todos")
        if(localTodos){
          setTodos(JSON.parse(localTodos))  //to exchange data
        }
    }, [])
    
  
    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos)) // to convert the JSON obj data into string.
    },[todos])
    
    const addTodo = todo => {
        // removes the extra whitespaces while typing todos & null/empty todos
        if(!todo.text || /^\s*$/.test(todo.text) ){
            return
        }

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        // console.log(...todos);
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo;
        })
        setTodos(updatedTodos)
    }

    const updateTodo = (todoId, newValue) =>{
        if(!newValue.text || /^\s*$/.test(newValue.text) ){
            return
        }
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr);
    }

    return (
        <div>
            <h1>What's the plan for Today</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} completeTodo = {completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </div>
    )
}

export default TodoList
