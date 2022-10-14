import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {

  const [movies,setMovies] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const[error, setError] = useState(null);

  useEffect(() => {
     fetchMovieHandler();
  },[]);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://react-demo-3582f-default-rtdb.firebaseio.com/movies.json');

      if(!response.ok){
        throw new Error('something went wrong');
      }

      const data = await response.json();

      const loadMovies =[];

      for (const key in data){
        loadMovies.push({
          id: key,
          title:data[key].title,
          releaseDate:data[key].releaseDate,
          openingText:data[key].openingText,

        });
      }
     

    
       // .then(response=> {
       // return response.json();
       // }).then(data => {
        //  const transformedMovies = data.results.map(movieData => {
        //    return{
        //      id:movieData.episode_id,
        //      title:movieData.title,
        //      openingText: movieData.opening_crawl,
        //      releaseDate: movieData.release_date
        //    }
          
        //  });
        

     setMovies(loadMovies);
   
  }catch (error) {
    setError(error.message);
   }
   setIsLoading(false);
  }, []);

  async function addMovieHandler(movie) {
   const response = await fetch('https://react-demo-3582f-default-rtdb.firebaseio.com/movies.json',{
    method:'POST',
    body: JSON.stringify( movie),
    headers: {
      'content-Type' : 'application/json'
    }
   });
   const data =await response.json();
   console.log(data);
  }

  let content = <p>Found no Movies.</p>

  if(movies.length > 0) {
    content = <MoviesList movies = {movies} />;
  }

  if (error){
    content =<p>{error}</p>
  }
  if (isLoading){
    content =<p>Loading...</p>;
  }
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie = {addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length >0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length ===0 && !error && <p>Found No Movies</p>}
        { isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>} */}{content}
      </section>
    </React.Fragment>
  );
}

export default App;
