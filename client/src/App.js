import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login, Signup, Student } from "./pages";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AuthorPage from "./pages/Author";
import StudentPage from "./pages/Student";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/author" element={<AuthorPage />} />
        </Routes>
    </div>
  );
}

export default App;
