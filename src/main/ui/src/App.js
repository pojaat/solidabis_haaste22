import './App.css';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

function App() {
  const axios = require('axios');
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:8080/api/v1/restaurants/helsinki', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      const json = await data.json()
      Cookies.set('VOTERID', json.voterId, { sameSite: 'None', secure: true })
      setRestaurants(json.restaurants)
      return json
    }

    fetchData()
  }, [])

  const vote = (id) => {
    axios(`http://localhost:8080/api/v1/vote/${id}`, {
      method: 'post',
      headers: { Cookie: 'VOTERID=' + Cookies.get('VOTERID') },
      withCredentials: true
    }).then(res => {
    }).catch(function (error) {
      console.log(error)
      //hack
      setRestaurants(restaurants.map(restaurant => restaurant.id !== id ? restaurant : { ...restaurant, votes: restaurant.votes + 1 }))
    })
  }

  return (
    <div>
      <h1>Helsingin Tikkataulu</h1>
      <h3>Restaurangs;</h3>
      <div className="restaurants" id="restaurants">
        {restaurants.map(restaurant =>
          <div key={restaurant.id + restaurant.name}>
            <h3><strong>{restaurant.name}</strong></h3>
            <ul>
              <li key={restaurant.id}><strong>Aukiolo:</strong> {restaurant.openingHours}</li>
              <li key={restaurant.name}><strong>Äänet:</strong> {restaurant.votes}</li>
            </ul>
            <button onClick={() => vote(restaurant.id)}>+1!</button>
          </div>
        )}
      </div>
    </div>
  )
}
export default App;
