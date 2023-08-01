import React from 'react';
import Trip from './Trip';

export default function TripList(props) {

  let filteredTrips = [];

  const filterTripByTitle = (title, array) => {
    return array.filter((trip) => trip.title === title);
  };

  const filterTripByLevel = (level, array) => {
    return array.filter((trip) => trip.level === level);
  };

  filteredTrips = props.title? filterTripByTitle(props.title, props.trips): props.trips;
  filteredTrips= props.duration? filterTripByDuration(props.duration, filteredTrips): filteredTrips;
  filteredTrips = props.level?  filterTripByLevel(props.level, filteredTrips): filteredTrips;


  return filteredTrips.length > 0 ? (
    <>
      {filteredTrips.map((trip) => (
        <Trip
          key={trip.id}
          id={trip.id}
          title={trip.title}
          description={trip.description}
          level={trip.level}
          duration={trip.duration}
          price={trip.price}
          image={trip.image}
        />
      ))}
    </>
  ) : (
    <p>No trips found with the selected filters.</p>
  );
}

function filterTripByDuration(value, filteredArray) {

  switch (value) {
    case "0_x_5":
      filteredArray = filteredArray.filter(item => item.duration < 5);
      break;
    case "5_x_10":
      filteredArray = filteredArray.filter(item => item.duration >= 5 && item.duration < 10);
      break;
    case "10_x":
      filteredArray = filteredArray.filter(item => item.duration >= 10);
      break;
    default:
      break;
  }
  return filteredArray;
}

