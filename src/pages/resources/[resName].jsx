import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

import DataTable from '@/components/dataTable';
import withLoading from '@/components/loading';
import SearchInput from '@/components/searchInput';
import API from '../api';
import { searchFunction, sortFunction } from '@/utils/methods';

//higher order component to reuse logic 
const ComponentWithLoading = withLoading(DataTable);

const Resources = () => {
    const router = useRouter()
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [loader, setLoader] = useState();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (router?.query?.resName) {
            fetchResByName(router?.query?.resName?.replace(/-/g, " "))
        }
    }, [router?.query?.resName])


    //fetch resources data by name

    const fetchResByName = useCallback(async (resId) => {
        setLoader(true)
        await API.getByResourceName(resId).then(data => {
            setData(data)
            setFilterData(data)
        }).catch(err => err).finally(() => setLoader(false))
    }, [])

    //on sort column 

    const onSort = (key, key2, sort, number) => {
        setLoader(true);

        let sortData = filterData.sort((a, b) => {
            if (sort) {
                return sortFunction(key, key2, a, b, number)
            } else {
                return sortFunction(key, key2, b, a, number)

            }
        });
        setLoader(false);
        setFilterData(sortData);
    };

    // on search location,app name,meter category

    const onChangeSearchText = async (event) => {
        let value = event?.target?.value?.replace(" ", "");

        setLoader(true);
        setSearchText(event?.target?.value);

        if (value) {

            setFilterData(await searchFunction(data, value))

        } else {
            setFilterData(data);
        }
        setTimeout(() => {
            setLoader(false);
        }, 200);

    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4"> Resources Table</h1>
            <SearchInput onChange={onChangeSearchText} value={searchText} />

            <ComponentWithLoading
                isLoading={loader}
                data={filterData}
                onSort={onSort}
            />
        </div>
    )
}

export default Resources