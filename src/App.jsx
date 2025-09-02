import { createBrowserRouter , createRoutesFromElements , Route , RouterProvider } from "react-router-dom"
import RootLayOut from "./componat/RootLayOut"
import Home from "./page/Home"
import Users from "./page/Users"

function App() {

  let router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayOut/>}>
      <Route path="/" element={<Home/>} />
      <Route path="/users" element={<Users/>} />
    </Route>
  ))
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
