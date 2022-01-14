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

const VALUE_COMPARE = -1;

const defaultOrder = { column: 'population', sort: 'ASC' };

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [optionsFilter, setOptionsFilter] = useState(filterOptions);
  const [dataLocal, setDataLocal] = useState([]);
  const [orderValue, setOrderValue] = useState(defaultOrder);

  function compareValue(a, b) {
    if (Number(a[orderValue.column]) < Number(b[orderValue.column])) {
      return VALUE_COMPARE;
    }
    if (Number(a[orderValue.column]) > Number(b[orderValue.column])) {
      return 1;
    }
    return 0;
  }

  function compareName(a, b) {
    if (a.name < b.name) {
      return VALUE_COMPARE;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  function orderByname({ sort }, dataInitial) {
    switch (sort) {
    case 'ASC':
      return dataInitial.sort(compareName);
    case 'DESC':
      return dataInitial.sort(compareName).reverse();
    default:
      return dataInitial;
    }
  }

  function order({ sort }, dataInitial) {
    switch (sort) {
    case 'ASC':
      return [...dataInitial].sort(compareValue);
    case 'DESC':
      return [...dataInitial].sort(compareValue).reverse();
    default:
      return dataInitial;
    }
  }

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
    filterOptions,
    orderValue,
    setOrderValue,
    order,
    orderByname,
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
