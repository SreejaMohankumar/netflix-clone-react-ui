import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'


const Titlecards = ({title, category}) => {

  const[apiData, setApiData] = useState([]);

  const cardsRef = useRef(); 

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTkwMDE5ZjVhM2U1ZjU1Yjg0MWIwNDFlMzJkYzZlZiIsIm5iZiI6MTc0MjgxMjY4OC45MjIsInN1YiI6IjY3ZTEzNjEwOTY4ZWUyMDg2NzRkODgzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R2AZ50rvA72EtzcfA016_c_bvPLwLsmMZ8jUBfBFWzs'
    }
  };
  
 

  const handlewheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel', handlewheel);
  },[])
  
  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card, index)=>{
            return <div className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </div>
          })}
        </div>
    </div>
  )
}

export default Titlecards