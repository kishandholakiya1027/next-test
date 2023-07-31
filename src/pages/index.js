import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { Inter } from "next/font/google";
import DataTable from "@/components/dataTable";
import API from "./api";
import { BASE_URL } from "../../config";
import withLoading from "@/components/loading";
import SearchInput from "@/components/searchInput";
import { searchFunction, sortFunction } from "@/utils/methods";
const inter = Inter({ subsets: ["latin"] });

//higher order component to reuse logic 
const ComponentWithLoading = withLoading(DataTable);

function Home() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  //fetch raw data 
  const fetchData = async () => {
    setLoader(true);
    await API.getRawData(`${BASE_URL}`)
      .then((data) => {
        if (data) {
          setData(data);
          setFilterData(data);

        }
      })
      .catch((err) => err)
      .finally(() => setLoader(false));
  };

  // on search location,app name,meter category

  const onChangeSearchText = async (event) => {
    let value = event?.target?.value?.replace(" ", "");
    setLoader(true);

    setSearchText(event?.target?.value);
    if (value) {
      setFilterData(await searchFunction(data, value));

    } else {
      setFilterData(data);
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);

  };

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



  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4"> Data Table</h1>
      <SearchInput onChange={onChangeSearchText} value={searchText} />

      <ComponentWithLoading
        isLoading={loader}
        data={filterData}
        onSort={onSort}
      />
    </div>
  );
}

export default Home;
