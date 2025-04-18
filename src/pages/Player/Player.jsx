import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

const {id} = useParams();

const navigate = useNavigate();

  const [apiData,setApiData] = useState({
    name:'',
    key:'',
    published_at:'',
    type:''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjk0YjUyMGY5YjA1MTMwZGZlNjk4MjZkNmEzOTYzNyIsIm5iZiI6MTc0NDg2NTg4OC4zNDA5OTk4LCJzdWIiOiI2ODAwOGE2MDJjODVlNzk2NjM5OTU1OWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eaV2gYcYyqWgHgF4CukCDLYPjUNPqlTB1lhGKGNg3G0'
    }
  };
  
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));

  },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt=""  onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} 
      title='motivation' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,19)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
