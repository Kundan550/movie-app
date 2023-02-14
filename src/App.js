 import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchInput from './components/SearchInput';
import AddFavourite from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourites';
import './App.css';


	
function App() {

  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites,setfavourites] = useState([]);
  const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=${searchValue}s&apikey=5b7ce325`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	const AddFavouriteMovie = (movie)=>{
       const newFavouriteList = [...favourites,movie];
	   setfavourites(newFavouriteList);
	   saveToLocalStorage(newFavouriteList);
	}


   const RemoveFavouritesMovie =(movie) =>{
         const newFavouriteList = favourites.filter((favourite) =>favourite.imdbID !== movie.imdbID);

		 setfavourites(newFavouriteList)
		 saveToLocalStorage(newFavouriteList);
   }

  useEffect(() => {
		getMovieRequest();
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		setfavourites(movieFavourites);
	}, []);
const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};


  return (
    <div className='container-fluid movie-app'>
      <div className='row fit'>
				<MovieListHeading heading='Movies' />
				<SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
           <MovieList
		    movies={movies} 
			favouritecomponenet={AddFavourite}
			handleFavouriteclick={AddFavouriteMovie}/>
			</div>

			<div className='row fit'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList movies={favourites} favouritecomponenet={RemoveFavourites}
				handleFavouriteclick={RemoveFavouritesMovie}
				/>
			</div>
		</div>
  );
}

export default App;
