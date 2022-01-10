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
    const dataForFilter = data;
    // aplicar filtros existentes menos o excluido
    const newArray = filters.map((filter, index) => verifyComparison(filters[filters.lenght - (index + 1)], dataForFilter));
    console.log(newArray);
  }

  function onClick(value) {
    const newArray = filterByNumericValues.filter((elemnt) => elemnt.column !== value);
    setFilterByNumericValues(newArray);
    setOptionsFilter([...optionsFilter, value]);
    applyFilters();
    setDataLocal(verifyComparison((filters.lenght) ? filters[filters.lenght - 1] : {}, data));
  }

  return (
    <div>
      {
        filters.map(({ column, comparison, value }, i) => (
          <div key={ i } data-testid="filter">
            <div>
              { `${column} ${comparison} ${value}` }
            </div>
            <button
              type="button"
              onClick={ () => onClick(column) }
            >
              x
            </button>
          </div>
        ))
      }
    </div>
  );
}
