import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foodTrucks, setFoodTrucks] = useState([]);

  const onClick = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(findFoodTrucks, geolocationError);
    } else {
      setError("You're current location cannot be found")
      setLoading(false);
    }
  }

  function findFoodTrucks(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`/foodtrucks?latitude=${latitude}&longitude=${longitude}`)
      .then(response => response.json())
      .then(data => {
        setFoodTrucks(data.foodTrucks);
      })
      .catch(error => {
        console.log(error)
        setError("Something went wrong, try again in a few minuntes")
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function geolocationError() {
    setError("You're current location cannot be found");
    setLoading(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        {error && <div> {error} </div>}
        {(loading) ? (
          <div>
            Loading...
          </div>
        ) : (
          <div>
            <Button
              variant="primary"
              size="lg"
              disabled={loading || error}
              onClick={!loading ? onClick : null}
            >
            Find food trucks open now
            </Button>
            {foodTrucks.length > 0 && (
              <CardGroup>
                {foodTrucks.map((foodTruck) => (
                  <Card key={`foodtruck-${foodTruck.id}`}>
                    <Card.Body>
                      <Card.Title> {foodTruck.name}</Card.Title>
                      <Card.Text>
                        <span>
                          Distance Away: {(foodTruck.distanceAway).toFixed(2)} miles
                        </span>
                        <br/>
                        <span>
                          Hours Open: {(foodTruck.dayshours)}
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </CardGroup>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
