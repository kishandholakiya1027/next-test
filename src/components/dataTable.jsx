// components/DataTable.js
import { tableColumn } from '@/utils/constant';
import Link from 'next/link';
import React, { useState } from 'react';

const DataTable = ({ data, onSort }) => {
    const [sortColumnName, setSortColumnName] = useState()
    const [asc, setasc] = useState()

    return (
        <div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        {tableColumn?.map(item => (
                            <th className="py-3 px-6 text-left">
                                <div className='flex items-center justify-start cursor-pointer' onClick={() => {
                                    setSortColumnName(item?.label)
                                    onSort(item?.key, item?.key2, sortColumnName === item?.label ? !asc : true, item?.number)
                                    sortColumnName === item?.label ? setasc(!asc) : setasc(true)
                                }}>

                                    {item?.label}
                                    {sortColumnName === item?.label ? asc ? <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 cursor-pointer transform rotate-180 ml-2"
                                        fill="none"
                                        style={{ rotate: "180deg" }}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 15l7-7 7 7"
                                        />
                                    </svg> :
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4  ml-3 cursor-pointer"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg> : null}
                                </div>
                            </th>

                        ))}
                        {/* <th className="py-3 px-6 text-left">Business Unit</th>
                    <th className="py-3 px-6 text-left">Master Category</th>
                    <th className="py-3 px-6 text-left">Service Name</th>
                    <th className="py-3 px-6 text-left">Consumed Quantity</th>
                    <th className="py-3 px-6 text-left">Cost</th>
                    <th className="py-3 px-6 text-left">Unit of measure</th>
                    <th className="py-3 px-6 text-left">Location</th>
                    <th className="py-3 px-6 text-left">Date</th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        const tag = item?.Tags
                        return (
                            <tr
                                key={item.id}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left ">
                                    <Link href={`/applications/${tag?.["app-name"]}`}>{tag?.["app-name"]}
                                    </Link>                                 </td>
                                <td className="py-3 px-6 text-left">{tag?.["business-unit"]}</td>
                                <td className="py-3 px-6 text-left">  <Link href={`/resources/${item?.MeterCategory?.replace(" ", "-")}`}>{item?.MeterCategory}</Link></td>
                                <td className="py-3 px-6 text-left">{parseFloat(item?.ConsumedQuantity)?.toFixed(2)}</td>
                                <td className="py-3 px-6 text-left">{parseFloat(item?.Cost)?.toFixed(2)}</td>
                                <td className="py-3 px-6 text-left">{parseInt(item?.UnitOfMeasure)}</td>
                                <td className="py-3 px-6 text-left">{item?.Location}</td>
                                <td className="py-3 px-6 text-left">{item?.Date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    );
};

export default DataTable;
