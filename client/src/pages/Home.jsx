import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/login");
      // }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
          position: "top-right",
        })
        : (removeCookie("token"), navigate("/login"));
    };
    //verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Continue = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      <div className="home_page"align="center">
        <div className="content" align="center">
          <h1>
            {" "}
            Welcome to <br></br> Grand Library, Colombo
            <br></br><br></br>
          </h1>
          <div>

          </div>
          <button onClick={Continue}>Get Started</button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;