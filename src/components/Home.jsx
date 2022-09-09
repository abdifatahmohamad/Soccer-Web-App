import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    // const response = await axios.get("https://e-soccer-crud.herokuapp.com/api/get");
    const response = await axios.get("https://new-soccerdb.herokuapp.com/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Using Fetch 
//   useEffect(() => {
//   fetch('http://localhost:5000/api/get')
//     .then((res) => res.json())
//     .then((data) => {
//       setData(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, []);

  const deleteTeam = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that team ?")
    ) {
      // axios.delete(`https://e-soccer-crud.herokuapp.com/api/remove/${id}`);
      axios.delete(`https://new-soccerdb.herokuapp.com/api/remove/${id}`);
      toast.success("Team Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div className="home-content">
      <h1>A brief description about this application</h1>
        <p className="text">This full-stack web application that uses <strong>Node.js</strong> with <strong>Express</strong>, <strong>MySQL</strong>, and <strong>React.js</strong>.
            This project is great intro incorporating the front-end to the backend and adding database to it.
            Through the teams name and stadium, we can <strong>CREATE/INSERT</strong> new team information into the table storing data to the mysql database.
            We can also <strong>SEARCH</strong> by the team name using the search input -- if the team name doesn't exist it will show "No data".
            We can also <strong>UPDATE</strong> existing team name by just clicking the edit button.
            Finally, we can <strong>DELETE</strong> any exiting team information from the database by just using delete button.
        </p>
      <Link to="/addTeam">
        <button className="btn btn-add-team">Add Team</button>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Stadium</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.stadium}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => deleteTeam(item.id)}>
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
