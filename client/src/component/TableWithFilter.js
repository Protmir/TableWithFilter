import {useState, useMemo, useEffect} from 'react'
import {filterRows, paginateRows} from './helpers'
import {Pagination} from './Pagination'

export const TableWithFilter = ({filterFields, columns, records, pageSize}) => {
    const [activePage, setActivePage] = useState(1)
    const [filters, setFilters] = useState({})
    const [searchColumns, setSearchColumns] = useState([...filterFields]);
    const recordsPerPage = pageSize

    const filteredRows = useMemo(() => filterRows(records, filters), [records, filters])
    const calculatedRows = paginateRows(filteredRows, activePage, recordsPerPage)

    const count = filteredRows.length
    const totalPages = Math.ceil(count / recordsPerPage)

    useEffect(() => {
        clearAll()
    }, [searchColumns])

    const handleSearch = (value, filters) => {
        setActivePage(1)

        if (value) {
            filters.forEach(accessor => {
                setFilters((prevFilters) => ({
                    ...prevFilters,
                    [accessor]: value,
                }))
            })
        } else {
            filters.forEach(accessor => {
                setFilters((prevFilters) => {
                    const updatedFilters = {...prevFilters}
                    delete updatedFilters[accessor]

                    return updatedFilters
                })
            })
        }
    }

    const clearAll = () => {
        setActivePage(1)
        setFilters({})
    }

    return (
        <>
            <input
                type="search"
                placeholder={'Search'}
                onChange={(event) => handleSearch(event.target.value, searchColumns)}
            />
            {columns.map((column) => {
                return (
                    <label key={column.label}>
                        <input
                            type='checkbox'
                            checked={searchColumns.includes(column.accessor)}
                            onChange={(e) => {
                                const checked = searchColumns.includes(column.accessor);
                                setSearchColumns((prev) =>
                                    checked
                                        ? prev.filter((sc) => sc !== column.accessor)
                                        : [...prev, column.accessor],
                                );
                            }}
                        />
                        {column.label}
                    </label>
                )
            })}
            <table>
                <thead>
                <tr>
                    {columns.map((column) => {
                        return (
                            <th key={column.accessor}>
                                <span>{column.label}</span>
                            </th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {calculatedRows.map((row) => {
                    return (
                        <tr key={row.id}>
                            {columns.map((column) => {
                                if (column.format) {
                                    return <td key={column.accessor}>{column.format(row[column.accessor])}</td>
                                }
                                return <td key={column.accessor}>{row[column.accessor]}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>

            {count > 0 ? (
                <Pagination
                    activePage={activePage}
                    count={count}
                    recordsPerPage={recordsPerPage}
                    totalPages={totalPages}
                    setActivePage={setActivePage}
                />
            ) : (
                <p>No data found</p>
            )}

            <div>
                <p>
                    <button onClick={clearAll}>Clear all</button>
                </p>
            </div>
        </>
    )
}
