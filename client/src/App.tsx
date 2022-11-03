import { Route, Routes } from "react-router-dom";
import Add from "./pages/add";
import Books from "./pages/books";
import Update from "./pages/update";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
