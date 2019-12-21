import React, { Component } from 'react';
import MovieRow from './MovieRow.js'
import './App.css';
import $ from 'jquery'

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {}
    this.movieSearch("batman")
  }

  movieSearch(searchWord){
    console.log("Search function")
    const urlString ="https://api.themoviedb.org/3/search/movie?api_key=aca2d915bde9a36a2b60b5b04bb21b7f&query=" + searchWord 
    $.ajax({
      url : urlString,
      success: (searchResults) => {
        console.log("Data fetched succesfully")
        

        const results = searchResults.results

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })
        // console.log(movieRows)
        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.log("error")
      }
    })
  }

  searchChangeHandler(event){
    console.log(event.target.value)
    const boundObject = this
    const searchWord = event.target.value
    boundObject.movieSearch(searchWord)

  }
 

  render(){
    return (
      <div >
          <table className="titleBar">
            <tbody>
              <tr>
                <td>
                  <img alt="app icon" width="50" src={require("./img/popcorn.svg")} ></img>
                </td>
                <td width="8"></td>
                <td>
                  <h1>Movies DB</h1>
                </td>
              </tr>
            </tbody>
          </table>

          <input style={{
            fontSize: 24,
            display: "block",
            width: "99%",
            paddingTop: 8,
            paddingBottom : 8,
            paddingLeft : 22

          }}onChange={this.searchChangeHandler.bind(this)} placeholder = "Enter Movie"/>

          {this.state.rows}

      </div>
    );
  }
}

export default App;
