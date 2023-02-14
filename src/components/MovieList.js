import React from 'react';
//import './MovieList.css'

const MovieList = (props) => {
  const Favouritecomponent = props.favouritecomponenet;
  return (
    <>
    {props.movies.map((movie,index)=>(
       <div className='image-container '>
       <img src={movie.Poster} alt='movie'></img>
       <div onClick={() =>props.handleFavouriteclick(movie)}
        className='overlay d-flex align-items-center justify-content-center'>
						<Favouritecomponent/>
					</div>
       </div>
    ))}
    </>
  )
}

export default MovieList;
