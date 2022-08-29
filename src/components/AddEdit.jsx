import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  stadium: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, stadium } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://e-soccer-crud.herokuapp.com/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !stadium) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        axios
          .post("https://e-soccer-crud.herokuapp.com/api/post", {
            name,
            stadium,
          })
          .then(() => {
            setState({ name: "", stadium: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Team Added Successfully");
      } else {
        axios
          .put(`https://e-soccer-crud.herokuapp.com/api/update/${id}`, {
            name,
            stadium,
          })
          .then(() => {
            setState({ name: "", stadium: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Team Updated Successfully");
      }

      setTimeout(() => navigate.push("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="m-t">
      <form className="add-form" onSubmit={handleSubmit}>

        <label htmlFor="name">Team Name</label>
        <input type="text" id="name" name="name" placeholder="Team Name ..." 
        value={name || ""} onChange={handleInputChange} />

        <label htmlFor="stadium">Stadium</label>
        <input type="stadium" id="stadium" name="stadium" placeholder="Team Stadium ..."
          value={stadium || ""} onChange={handleInputChange} />
          
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
