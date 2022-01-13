import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
// import testData from '../testData';
import MyContext from './ContextAPI';

const filterOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [optionsFilter, setOptionsFilter] = useState(filterOptions);
  const [dataLocal, setDataLocal] = useState([]);

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

  function verifyComparison({ column, comparison, value }, planets) {
    switch (comparison) {
    case 'maior que':
      return planets.filter(
        (planet) => planet[column] > Number(value),
      );

    case 'menor que':
      return planets.filter(
        (planet) => planet[column] < Number(value),
      );

    case 'igual a':
      return planets.filter(
        (planet) => planet[column] === value,
      );

    default:
      return data;
    }
  }

  // function compare(a, b) {
  //   if (a.name < b.name) {
  //     return -1;
  //   }
  //   if (a.name > b.name) {
  //     return 1;
  //   }
  //   return 0;
  // }

  // function orderBy({ column, sort }, dataInitial) {
  //   switch (sort) {
  //   case 'ASC':
  //     return dataInitial.sort(compare);
  //   case 'DESC':
  //     return dataInitial.sort(compare).reverse();
  //   default:
  //     return dataInitial;
  //   }
  // }

  const ObjValue = {
    data,
    setData,
    filterByNumericValues,
    setFilterByNumericValues,
    optionsFilter,
    setOptionsFilter,
    filterByName,
    setFilterByName,
    dataLocal,
    setDataLocal,
    verifyComparison,
  };

  return (
    <MyContext.Provider value={ ObjValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
