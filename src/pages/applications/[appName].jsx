import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import DataTable from '@/components/dataTable';
import withLoading from '@/components/loading';
import API from '../api';
import { searchFunction, sortFunction } from '@/utils/methods';
import SearchInput from '@/components/searchInput';

const ComponentWithLoading = withLoading(DataTable);

const Applications = () => {
    const router = useRouter()
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [loader, setLoader] = useState();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (router?.query?.appName) {
            fetchAppByName(router?.query?.appName)
        }
    }, [router?.query?.appName])



    const fetchAppByName = useCallback(async (appName) => {
        setLoader(true)
        await API.getByApplicationName(appName).then(data => {
            setData(data)
            setFilterData(data)
        }).catch(err => err).finally(() => setLoader(false))
    }, [])


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

    const onChangeSearchText = async (event) => {
        let value = event?.target?.value?.replace(" ", "");
        setLoader(true);
        setSearchText(event?.target?.value);
        let re = new RegExp(value, "i");

        if (value) {
            let sort = data?.filter(
                (item) =>
                    item?.Tags?.["app-name"]?.replace(" ", "")?.search(re) >= 0 ||
                    item?.MeterCategory?.replace(" ", "")?.search(re) >= 0 ||
                    item?.Location?.replace(" ", "")?.search(re) >= 0
            )
            setFilterData(sort);
        } else {
            setFilterData(data);
        }
        setTimeout(() => {
            setLoader(false);
        }, 200);

    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4"> Applications Table</h1>
            <SearchInput onChange={onChangeSearchText} value={searchText} />

            <ComponentWithLoading
                isLoading={loader}
                data={filterData}
                onSort={onSort}
            />
        </div>
    )
}

export default Applications