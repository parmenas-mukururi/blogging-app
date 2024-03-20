import { useState } from 'react'
import './App.scss'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import LoginPage from './routes/Login/LoginPage';
import RegisterPage from './routes/Register/RegisterPage';
import HomePage from './routes/Home/HomePage';
import WriteBlogPage from './routes/Write/WriteBlogPage';
import SingleBlogPage from "./routes/SingleBlog/SingleBlogPage"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"


const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children : [
      {
        path : "/",
        element : <HomePage/>
      },
      {
        path : "/post/:id",
        element : <SingleBlogPage/>
      },
      {
        path : "/write",
        element : <WriteBlogPage/> 
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
]);

function App() {


  return (
    <>
   <RouterProvider router={router}/>
    </>
  )
}

export default App
