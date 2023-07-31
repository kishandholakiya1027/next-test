import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { Inter } from "next/font/google";
import DataTable from "@/components/dataTable";
import API from "./api";
import { BASE_URL } from "../../config";
import withLoading from "@/components/loading";
import SearchInput from "@/components/searchInput";
import { sortFunction } from "@/utils/methods";
const inter = Inter({ subsets: ["latin"] });

const ComponentWithLoading = withLoading(DataTable);

function Home() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

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

  const onChangeSearchText = async (event) => {
    let value = event?.target?.value?.replace(" ", "");
    setLoader(true);

    setSearchText(event?.target?.value);
    let re = new RegExp(value, "i");
    if (value) {
      let items = data?.filter(
        (item) =>
          item?.Tags?.["app-name"]?.replace(" ", "")?.search(re) >= 0 ||
          item?.MeterCategory?.replace(" ", "")?.search(re) >= 0 ||
          item?.Location?.replace(" ", "")?.search(re) >= 0
      );
      setTimeout(() => {
        setFilterData(items);

      }, 500);
    } else {
      setFilterData(data);
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);

  };

  const onSort = (key, key2, sort) => {
    setLoader(true);

    let sortData = filterData.sort((a, b) => {
      if (sort) {
        return sortFunction(key, key2, a, b)
      } else {
        return sortFunction(key, key2, b, a)

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
