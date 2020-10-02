import "./Home.scss";
import React, { Component } from "react";
import axios from "axios";
import NavPostLogin from "../NavPostLogin/NavPostLogin";
import Post from "../Post/Post";

const API_URL = "http://localhost:8080";

export default class Home extends Component {
  state = {
    posts: [],
    search: "",
    recent: "Recent",
    deleted: "",
    results: "",
  };

  componentDidMount() {
    axios
      .get(`${API_URL}/posts`)
      .then((res) => {
        this.setState({ posts: res.data, deleted: res.data.deleted });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateSearch = (e) => {
    if (e.target.value === "" || e.target.value === null) {
      this.setState({ recent: "Recent", search: "" });
    } else {
      this.setState({
        search: e.target.value.substr(0, 20),
        recent: `Results for..."${e.target.value}"`,
      });
    }
  };

  deletePost = () => {
    axios
      .post(`${API_URL}/posts/${this.props.match.params.id}/delete`)
      .then((res) => {
        this.setState({ posts: res.data, deleted: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const filteredSearch = this.state.posts.filter((result) => {
      return (
        result.car
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase().trim()) !== -1
      );
    });

    return (
      <div className="home">
        <NavPostLogin />
        <header className="home__header">
          <h2 className="home__heading" onChange={this.updateSearch}>
            {this.state.recent}
          </h2>
          <input
            type="text"
            className="home__search"
            placeholder="Search posts &#x1F50E;"
            value={this.state.search}
            name="search"
            onChange={this.updateSearch.bind(this)}
          />
        </header>
        <div className="home__post-list">
          {filteredSearch.length === 0 ? (
            <h1 className="home__noResults">
              Whoops! No posts matched your search.
            </h1>
          ) : null}
          <h1 className="home__results">{this.state.results}</h1>
          {filteredSearch.map((data) => {
            if (data.deleted === false)
              return (
                <Post
                  postData={data}
                  key={data.id}
                  deletePost={this.deletePost}
                />
              );
          })}
        </div>
      </div>
    );
  }
}
