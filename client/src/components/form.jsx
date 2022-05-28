import React, { Component } from "react";
import axios from "axios";

class Form extends React.Component {
  state = {
    data: { name: "", price: 0, file: {} },
    errors: {},
    message: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("myImage", this.state.file);

    try {
      await axios.post("http://localhost:3001", formData);
      this.setState({ message: "Form data submitted successfully." });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    return (
      <>
        <h2>File Upload</h2>
        <p>{this.state.message}</p>
        <form>
          <div>
            <label>Name</label>
            <input
              type="text"
              id="name"
              name="myImage"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div>
            <label>File</label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg, .png, .gif"
              onChange={(e) => {
                this.setState({ file: e.target.files[0] });
              }}
            />
          </div>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </>
    );
  }
}

export default Form;
