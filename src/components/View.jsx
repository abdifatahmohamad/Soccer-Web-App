import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {
  const [team, setTeam] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://e-soccer-crud.herokuapp.com/api/get/${id}`)
      .then((resp) => setTeam({ ...resp.data[0] }));
  }, [id]);
  return (
    <div className="m-t">
      <div className="card">
        <div className="card-header">
          <p>Team info Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Team Name: </strong>
          <span>{team.name}</span>
          <br />
          <br />
          <strong>Stadium: </strong>
          <span>{team.stadium}</span>
          <br />
          <br />
          <Link to="/">
            <div className="btn btn-edit">Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
