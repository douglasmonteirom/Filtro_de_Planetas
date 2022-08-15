import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/ContextAPI';

export default function FilterByNumeric() {
  const {
    data,
    setDataLocal,
    filterByNumericValues,
    setFilterByNumericValues,
    optionsFilter,
    setOptionsFilter,
    verifyComparison,
  } = useContext(MyContext);
  const [filters, setfilters] = useState([]);

  useEffect(() => {
    setfilters(filterByNumericValues);
    return () => {
      setfilters(filterByNumericValues);
    };
  }, [filterByNumericValues, setfilters]);

  function applyFilters() {
    if (filters.length === 1) {
      setDataLocal(data);
    } else {
      let dataForFilter = data;
      for (let index = 0; index < filters.length - 1; index += 1) {
        dataForFilter = verifyComparison(filters[index], dataForFilter);
      }
      setDataLocal(dataForFilter);
    }
  }

  function onClick(value) {
    const newArray = filterByNumericValues.filter((elemnt) => elemnt.column !== value);
    setFilterByNumericValues(newArray);
    setOptionsFilter([...optionsFilter, value]);
    applyFilters();
  }

  return (
    <>
      {
        filters.map(({ column, comparison, value }, i) => (
          <div className='filter-aplication' key={ i }>
            <p>
              { `${column} ${comparison} ${value}` }
            </p>
            <button
              type="button"
              onClick={ () => onClick(column) }
            >
              x
            </button>
          </div>
        ))
      }
    </>
  );
}
