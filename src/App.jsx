import { createBrowserRouter , createRoutesFromElements , Route , RouterProvider } from "react-router-dom"
import RootLayOut from "./componat/RootLayOut"
import Home from "./page/Home"

function App() {

  let router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayOut/>}>
      <Route path="/" element={<Home/>} ></Route>
    </Route>
  ))
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
