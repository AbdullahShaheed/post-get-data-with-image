import React from "react";
import axios from "axios";

const endpoint = "http://localhost:3001";

class Form extends React.Component {
  state = {
    data: { name: "", price: "", image: {} },
    message: "",
    productId: "",
    image: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("productImage", this.state.image);

    try {
      await axios.post(endpoint, formData);
      this.setState({ message: "Form data submitted successfully." });
    } catch (err) {
      console.log(err.message);
    }
  };

  handleGet = async (e) => {
    e.preventDefault();

    const res1 = await axios.get(endpoint + "/" + this.state.productId);

    this.setState({ data: res1.data });

    const res2 = await axios.get(`${endpoint}/images/${this.state.productId}`, {
      responseType: "blob",
    });

    this.setState({
      image: URL.createObjectURL(res2.data), //convert blob to image data understood by img element
    });
  };

  render() {
    return (
      <>
        <h2>File Upload and Download</h2>
        <p>{this.state.message}</p>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              onChange={(e) => {
                this.setState({ price: e.target.value });
              }}
            />
          </div>

          <div>
            <label>Image</label>
            <input
              type="file"
              id="image"
              name="productImage"
              accept=".jpg, .png, .gif"
              onChange={(e) => {
                this.setState({ image: e.target.files[0] });
              }}
            />
          </div>

          <button onClick={this.handleSubmit}>Submit Form Data</button>
        </form>
        <hr />
        <form>
          <button onClick={this.handleGet}>Get Product with Image</button>
          <input
            type="text"
            id="productId"
            name="productId"
            placeholder="Enter id"
            onChange={(e) =>
              this.setState({ productId: e.currentTarget.value })
            }
          />
          <ul>
            <li>{this.state.data.name}</li>
            <li>{this.state.data.price}</li>
          </ul>
          <img src={this.state.image} />
        </form>
      </>
    );
  }
}

export default Form;
