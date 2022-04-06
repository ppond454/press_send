import { Routes, Route, Navigate } from "react-router-dom"
import React from "react"
import Login from "../pages/Login"



const PublicRouter = ( ) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default PublicRouter
