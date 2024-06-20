import { upload } from "@testing-library/user-event/dist/upload";
import Home from "./Pages/Home";
import {  Routes, Route } from 'react-router-dom';
import Upload from "./Pages/musicUpload";

function App() {
  return (
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/upload" element={<Upload/>} />

      </Routes>
  );
}

export default App;
