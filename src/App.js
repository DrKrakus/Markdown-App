import React, { Component } from "react";
import marked from "marked";
import { sampleText } from "./sampleText";
import "./App.css";

class App extends Component {
  state = {
    text: sampleText,
  };

  componentDidMount() {
    const text = localStorage.getItem("text");
    if (text) {
      this.setState({ text });
    } else {
      this.setState({ text: sampleText });
    }
  }

  componentDidUpdate() {
    const { text } = this.state;
    localStorage.setItem("text", text);
  }

  handleChange = (e) => {
    const text = e.target.value;
    this.setState({
      text,
    });
  };

  renderText = (text) => {
    const __html = marked(text, { sanitizer: true });
    return { __html };
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea
              className="form-control"
              rows="35"
              onChange={this.handleChange}
              value={this.state.text}
            ></textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
