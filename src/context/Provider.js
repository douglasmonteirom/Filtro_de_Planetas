import PropTypes from 'prop-types';
import React, { useState } from 'react';
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

  function verifyComparison({ column, comparison, value }, planets) {
    switch (comparison) {
    case 'maior que':
      return planets.filter(
        (planet) => planet[column] > Number(value),
      );

    case 'menor que':
      return planets.filter(
        (planet) => planet[column] <= value,
      );

    case 'igual a':
      return planets.filter(
        (planet) => planet[column] === value,
      );

    default:
      return planets;
    }
  }

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
