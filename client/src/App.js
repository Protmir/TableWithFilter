import React, {useEffect, useState} from "react";
import axios from 'axios';

import './App.css'
import {TableWithFilter} from './component/TableWithFilter'

export default function App() {
    const [dataApi, setDataApi] = useState({
        columns: [],
        records: [],
        filterFields: []
    })

    useEffect(() => {
        axios.get('http://localhost:5000/api/table/61d5b900fe8e348492e32410')
            .then(res => {
                setDataApi({
                    columns: res.data.data.columns,
                    records: res.data.data.records,
                    filterFields: res.data.data.filterFields
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className='App'>
            <h1>TableWithFilter</h1>
            <h2>Filtering, Pagination</h2>

            <TableWithFilter filterFields={dataApi.filterFields} records={dataApi.records} columns={dataApi.columns} pageSize={3} />
        </div>
    )
}
