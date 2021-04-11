import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavourite";
import RemoveFavourites from "./components/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("hero");
  const [favourites, setFavourites] = useState([]);
  const getMovieRequest = async (searchValue) => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchValue}&apikey=45ce1072`
    );
    const responseJson = await response.json();
    console.log("val", responseJson);

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
    /* another method 
    let responseJson;
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    fetch(url)
      .then((a) => a.json())
      .then((b) => {
        responseJson = b;
        console.log("ttstst");
        setMovies(responseJson.Search);
      });*/
  };
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  };
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className="row">
        <MovieList
          movies={movies}
          favouriteComponenet={AddFavourite}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponenet={RemoveFavourites}
        />
      </div>
    </div>
  );
};
export default App;
