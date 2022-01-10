import React, { useState, useContext, useEffect } from 'react';
import Table from '../components/Table';
import MyContext from '../context/ContextAPI';
import FilterByNumeric from '../components/FilterByNumeric';

function renderHeaderTable() {
  return (
    <tr>
      <th>Nome</th>
      <th>Rotation Period</th>
      <th>Orbital Period</th>
      <th>Diameter</th>
      <th>Climate</th>
      <th>Gravity</th>
      <th>Terrain</th>
      <th>Surface_water</th>
      <th>Population</th>
      <th>Films</th>
      <th>Created</th>
      <th>Edited</th>
      <th>Url</th>
    </tr>
  );
}

export default function StarWars() {
  const {
    setData,
    optionsFilter,
    setOptionsFilter,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    dataLocal,
    setDataLocal,
    verifyComparison,
  } = useContext(MyContext);
  const defaultComparison = {
    column: optionsFilter[0],
    comparison: 'maior que',
    value: 0,
  };
  const [currencyNumericValues, setCurencyNumericValues] = useState(defaultComparison);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((response) => response);
      setData(result.results);
      setDataLocal(result.results);
    };
    fetchData();
  }, [setData, setDataLocal]);

  function onChangeFilterByName({ target }) {
    setFilterByName({ name: target.value });
  }

  function onChangeFilterByNumericValues({ target }) {
    setCurencyNumericValues({ ...currencyNumericValues, [target.name]: target.value });
  }

  function onClick(value) {
    setFilterByNumericValues([...filterByNumericValues, currencyNumericValues]);
    setDataLocal(verifyComparison(currencyNumericValues, dataLocal));
    setOptionsFilter(optionsFilter.filter((option) => option !== value));
    setCurencyNumericValues({ ...defaultComparison, column: optionsFilter[1] });
  }
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => onChangeFilterByName(e) }
      />
      <section>
        <select
          data-testid="column-filter"
          name="column"
          value={ currencyNumericValues.column }
          onChange={ (e) => onChangeFilterByNumericValues(e) }
        >
          {
            optionsFilter.map((option) => (
              <option
                key={ option }
                value={ option }
              >
                { option }
              </option>))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ currencyNumericValues.comparison }
          onChange={ (e) => onChangeFilterByNumericValues(e) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ currencyNumericValues.value }
          onChange={ (e) => onChangeFilterByNumericValues(e) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => onClick(currencyNumericValues.column) }
        >
          Filtrar
        </button>
        <FilterByNumeric />
      </section>
      <table>
        <tbody>
          {renderHeaderTable()}
          <Table data={ dataLocal } filter={ filterByName.name } />
        </tbody>
      </table>
    </div>
  );
}
