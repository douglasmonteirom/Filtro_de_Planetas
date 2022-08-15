import React, { useState, useEffect, useContext } from 'react';
import MyContext from '../../context/ContextAPI';
import './Table.css';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const {
    filterByName,
    dataLocal,
  } = useContext(MyContext);

  useEffect(() => {
    const newData = dataLocal.filter(
      (planet) => planet.name.toLowerCase().includes(filterByName.name),
    );
    setPlanets([...newData]);
  }, [dataLocal, filterByName]);

  return (
    planets.map((planet, i) => (
      <tr className="table-row" key={ i }>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
        <td>
          {planet.films.map(
            (film, index) => <a key={ index } href={ film }>{ film }</a>,
          )}
        </td>
        <td>{planet.created}</td>
        <td>{planet.edited}</td>
        <td>{planet.url}</td>
      </tr>))
  );
}
