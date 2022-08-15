import React, { useState, useContext, useEffect } from 'react';
import Table from '../components/Table/Table';
import './StarWars.css';
import MyContext from '../context/ContextAPI';
import FilterByNumeric from '../components/FilterByNumeric';

function renderHeaderTable() {
  return (
    <tr className="table-header">
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
      <div className='container'>
        <section className="container-filter-text">
        <input
          type="text"
          placeholder="Digite o nome do planeta"
          onChange={ (e) => setFilterByName({ name: e.target.value }) }
        />
        </section>
        <section className="container-filter-numeric">
          <select
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
            name="value"
            value={ currencyNumericValues.value }
            onChange={ (e) => onChangeFilterByNumericValues(e) }
          />
          <button
            type="button"
            onClick={ () => onClick(currencyNumericValues.column) }
          >
            Filtrar
          </button>
        </section>
        <section className="container-order">
          <select
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
          <label className="container-radio" htmlFor="ASC">ASC
            <input
              id="ASC"
              name="sort"
              type="radio"
              value="ASC"
              onChange={ (e) => onChangeOrder(e) }
            />
            <span className="checkmark"></span>
          </label>
          <label className="container-radio" htmlFor="DESC">DESC
            <input
              id="DESC"
              name="sort"
              type="radio"
              value="DESC"
              onChange={ (e) => onChangeOrder(e) }
            />
            <span className="checkmark"></span>
          </label>
          <button
            type="button"
            onClick={ () => sortPlanets() }
          >
            Ordenar
          </button>
        </section>
        <section className="container-filter">
          <FilterByNumeric />
        </section>
      </div>
      <section className="container-table">
        <table>
            {renderHeaderTable()}
          <tbody>
            <Table />
          </tbody>
        </table>
      </section>
    </div>
  );
}
