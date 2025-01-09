import { Select, Table, Radio } from 'antd';
import React, { useState } from 'react';
import './styles.css'
import { Option } from 'antd/es/mentions';
import Button from '../Button/Button';

function index({ transactions }) {

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    let filteredTransactions = transactions.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
    );

    let sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortKey == "date") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortKey == "amount") {
            return a.amount - b.amount;
        } else {
            return 0;
        }
    });

    return (
        <>
            <div className='group'>
                <div className="search-group">
                    <input
                        type="input"
                        className="search-field" value={search}
                        onChange={(e) => { setSearch(e.target.value) }}
                        placeholder='search by name.'
                        required="" />
                    <label className="form__label">search by name.</label>
                </div>
                <Select
                    className='select-input'
                    value={typeFilter}
                    onChange={(value) => setTypeFilter(value)}
                    placeholder=''
                >
                    <Option value=''>All</Option>
                    <Option value='income'>Income</Option>
                    <Option value='expense'>Expense</Option>
                </Select>
            </div>
            <div className='group'>
                <Radio.Group className='radio-input' onChange={e => setSortKey(e.target.value)} value={sortKey} >
                    <Radio.Button value="">added</Radio.Button>
                    <Radio.Button value="date">sort by date</Radio.Button>
                    <Radio.Button value="amount">sort by amount</Radio.Button>
                </Radio.Group>

                <div className='CSV'>
                    <Button
                        text='Export to CSV'
                        blue={true}
                    //  onClick={exportToCsv}
                    />
                    <Button
                        text='Import from CSV'
                        blue={true}
                    // onChange={importFromCsv}
                    />
                </div>
            </div>
            <Table className='table' dataSource={sortedTransactions} columns={columns} />
        </>
    );
}

export default index;