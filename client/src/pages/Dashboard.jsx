import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styling/Dashboard.css";


export default function Dashboard() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyCookie = async () => {
          if (!cookies.token) {
           navigate("/login");
          } else {
            try {
              const response = await fetch("http://localhost:4000", {
                method: "POST",
                credentials: "include",
              });
    
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
    
              const data = await response.json();
              const { status, user } = data;
    
              if (!status) {
                removeCookie("token");
                 navigate("/login");
              } 
            } catch (error) {
              console.error("Error fetching data:", error);
              removeCookie("token");
              navigate("/login");
              
            }
          }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
    
    return (
        <div>
            <nav className="navbar navbar-expand-xl navbar-light bg-dark">
                    <NavLink className="nav-link" to="/">
                        <button className="logout" onClick={() => removeCookie("token")}>Log Out</button>
                    </NavLink>
            </nav>

            <div className="dashboard-container">
                <h1 className="dashboard-title">LIBRARY MANAGEMENT SYSTEM</h1>

                <div className="row">
                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/Book">
                            <button className="buttonB">Books</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/Author">
                            <button className="buttonA">Authors</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/Student">
                            <button className="buttonS">Students</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/Teacher">
                            <button className="buttonT">Teachers</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/Librarian">
                            <button className="buttonL">Librarians</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
