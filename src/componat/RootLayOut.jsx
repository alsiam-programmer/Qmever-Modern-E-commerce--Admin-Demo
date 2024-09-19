import React from 'react'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'

const RootLayOut = () => {
  return (
    <>
    <Menu/>
    <Outlet/>
    </>
  )
}

export default RootLayOut