import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("https://e-soccer-crud.herokuapp.com/api/get");
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
      axios.delete(`https://e-soccer-crud.herokuapp.com/api/remove/${id}`);
      toast.success("Team Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div className="m-t">
      <Link to="/addTeam">
        <button className="btn btn-contact">Add Team</button>
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
