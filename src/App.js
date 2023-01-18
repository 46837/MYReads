import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";



class BooksApp extends React.Component {
  state = {
    loading: false,
    showSearchPage: false,
    books: [],
    search: "",
    result: [],
   
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })

    });
  }

  changeShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    await BooksAPI.getAll().then((res) => {
      this.setState({
        books: res,
      });
    });
    this.handleBooksSearch(this.state.search)
  };

  handleSearch = async (event) => {
    await this.setState({
      search: event.target.value,
    });
    console.log(this.state.search);
    this.handleBooksSearch(this.state.search);
  };

  handleBooksSearch = async (search) => {
    await BooksAPI.search(search).then((res) => {
      if (res && !res.error) {
        this.setState({
          result: res.map((booksSearch) => {
            this.state.books.forEach((book) => {
              if (booksSearch.id === book.id) booksSearch.shelf = book.shelf
            })
            return booksSearch;
          }),
          loadSearch: true
        });
      } else {
        this.setState({
          result: `No books like: " ${this.state.search} "`,
          loadSearch: false
        })
      }
    }); // then
    console.log("Search");
    console.log(this.state.result);
  };

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/search">
              <Search
                handleSearch={this.handleSearch}
                search={this.state.search}
                result={this.state.result}
                changeShelf={this.changeShelf}
                loading={this.state.loadSearch}
              />
            </Route>
            <Route path="/">
              <Home books={this.state.books} changeShelf={this.changeShelf} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
