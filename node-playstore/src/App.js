import React, { Component } from 'react';
import AppInfo from './AppInfo';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: '',
      sort: '',
      error: null
    }
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.search) {
      params.push(`genres=${this.state.search}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          books: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get Playstore apps at this time.'
        });
      })

  }

  render() {
    const books = this.state.books.map((book, i) => {
      return <AppInfo {...book} key={i}/>
    })
    return (
      <main className="App">
        <h1>Google Playstore Apps</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Genre: </label>
            <select id="search" name="search" onChange={e => this.setSearch(e.target.value)}>
              <option value="">All</option>
              <option value="Action">Action</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Strategy">Strategy</option>
              <option value="Casual">Casual</option>
              <option value="Arcade">Arcade</option>
              <option value="Card">Card</option>
            </select>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="App">App Name</option>
              <option value="Rating">Rating</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {books}
      </main>
    );
  }
}

export default App;