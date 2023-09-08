import { NavLink } from "react-router-dom";

export default function Dashboard() {
return (
<div>
  <nav class="navbar navbar-expand-xl navbar-light bg-dark">
   <NavLink className="nav-link" to="/">
    <button class="btn btn-light " style={{marginLeft: 20, fontSize: 15}} href=".png"> Log Out</button> 
  </NavLink>
  </nav>
  
  <div class="row p-5">
      <h1 align="center">BOOK MANAGEMENT SYSTEM</h1>
  <div class="col" align="center"> </div>
  <div class="col" align="center">

  <NavLink className="nav-link" to="/Book">
     <button type="button" class="btn p-5 mt-5 btn-outline-primary btn-lg btn-block">Books</button> <br></br><br></br>
  </NavLink>

  <NavLink className="nav-link" to="/Author">
     <button type="button" class="btn p-5 mt-4 btn-outline-secondary btn-lg btn-block">Authors </button><br></br><br></br>
  </NavLink>

  <NavLink className="nav-link" to="/Student">
     <button type="button" class="btn p-5 mt-4 btn-outline-success btn-lg btn-block ">Students</button><br></br><br></br>
  </NavLink>

  <NavLink className="nav-link" to="/recordList3">
     <button type="button" class="btn p-5 mt-4 btn-outline-danger btn-lg btn-block">Teachers</button><br></br><br></br>
  </NavLink>

  <NavLink className="nav-link" to="/recordList4">
     <button type="button" class="btn p-5 mt-4 btn-outline-warning btn-lg btn-block">Librarians</button>
  </NavLink>

    </div>
    <div class="col" align="center"> </div>
   </div>
</div>
 );
}

