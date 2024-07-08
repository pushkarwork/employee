import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Records from "./components/Records";
import Create from "./components/Create";
import EditRecord from "./components/EditRecord"
const port = "http://localhost:5000"
function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Records />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<EditRecord />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
