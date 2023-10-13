import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todo from "./Todo"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Chat from "../pages/Chat"
import Home from "../pages/Home"

const AppRouter = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} /> 
            <Route path="/todo" element={<Todo/>} /> 
            <Route path="/login" element={<Login/>} /> 
            <Route path="/register" element={<Register/>} /> 
            <Route path="/chat" element={<Chat/>} /> 
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRouter;