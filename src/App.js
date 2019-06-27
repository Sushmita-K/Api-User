import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      next: "",
      previous: "",
      results: [],
      show: false,
      detail: {},
      url: "https://swapi.co/api/people/"
    };
  }

  popUp = result => {
    this.setState({ show: true }, () => {
      fetch(result.url)
        .then(response => response.json())
        .then(res => {
          this.setState({ detail: res });
          // this.setState({ })
        })
        .catch(err => console.log(err));
    });
  };

  getResult = () => {
    if (this.state.show === true) {
      return (
        <div id="tl_popup_theme3_overlay">
          <div className="tl_popup_theme3_card">
            <button className="popUpbtn" onClick={this.popUpClose}>
              X
            </button>
            <div className="Details">
              <div>Name: {this.state.detail.name}</div>
              <div>Height: {this.state.detail.height}</div>
              <div>Mass: {this.state.detail.mass}</div>
              <div>Hair color:{this.state.detail.hair_color}</div>
              <div>Skin color: {this.state.detail.skin_color}</div>
              <div>Eye color: {this.state.detail.eye_color}</div>
              <div>Birth year:{this.state.detail.birth_year}</div>
              <div>Gender: {this.state.detail.gender}</div>
            </div>
          </div>
        </div>
      );
    }
  };
  popUpClose = () => {
    this.setState({
      show: false
    });
    // console.log(this.state.show)
  };
  getPData = () => {
    this.fetchApi(this.state.previous);
  };
  getNData = () => {
    this.fetchApi(this.state.next);
  };
  componentDidMount() {
    this.fetchApi(this.state.url);
  }

  fetchApi = apiUrl => {
    fetch(apiUrl)
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
          results: data.results,
          previous: data.previous,
          next: data.next
        });
        console.log(this.state);
      });
  };

  render() {
    let next,
      previous = null;
    if (this.state.next != null) {
      next = (
        <button
          className="Buttons"
          disabled={this.state.next == null}
          onClick={this.getNData}
        >
          {">>"}
        </button>
      );
    }
    if (this.state.previous != null) {
      previous = (
        <button
          className="Buttons"
          disabled={this.state.previous == null}
          onClick={this.getPData}
        >
          {"<<"}
        </button>
      );
    }

    return (
      <div>
        {this.state.results.map((result, index) => {
          return (
            <span
              className="Names"
              key={index}
              onClick={() => this.popUp(result)}
            >
              <span className="listItems">{result.name}</span>
            </span>
          );
        })}
        {this.getResult()}
        <div>
          {previous}
          {next}
        </div>
      </div>
    );
  }
}
export default App;
