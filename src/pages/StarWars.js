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
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    dataLocal,
    setDataLocal,
    verifyComparison,
    filterOptions,
    orderValue,
    setOrderValue,
    order,
    orderByname,
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
      setDataLocal(orderByname(orderValue, result.results));
    };
    fetchData();
  }, []);

  function onChangeFilterByNumericValues({ target }) {
    setCurencyNumericValues({ ...currencyNumericValues, [target.name]: target.value });
  }

  function onChangeOrder({ target }) {
    setOrderValue({ ...orderValue, [target.name]: target.value });
  }

  function onClick(value) {
    setFilterByNumericValues([...filterByNumericValues, currencyNumericValues]);
    setDataLocal(verifyComparison(currencyNumericValues, dataLocal));
    setOptionsFilter(optionsFilter.filter((option) => option !== value));
    setCurencyNumericValues({ ...defaultComparison, column: optionsFilter[1] });
  }

  function sortPlanets() {
    setDataLocal(order(orderValue, dataLocal));
  }
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setFilterByName({ name: e.target.value }) }
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
        <section>
          <select
            data-testid="column-sort"
            name="column"
            onChange={ (e) => onChangeOrder(e) }
          >
            {
              filterOptions.map((option) => (
                <option
                  key={ option }
                  value={ option }
                >
                  { option }
                </option>))
            }
          </select>
          <input
            name="sort"
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ (e) => onChangeOrder(e) }
          />
          <input
            name="sort"
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ (e) => onChangeOrder(e) }
          />
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ () => sortPlanets() }
          >
            Ordenar
          </button>
        </section>
        <FilterByNumeric />
      </section>
      <table>
        <tbody>
          {renderHeaderTable()}
          <Table />
        </tbody>
      </table>
    </div>
  );
}
