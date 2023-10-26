import { useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { useSearchStore } from "./search/search";

//query to retrieve user videos
export const fetchData = async (options?: {
  url?: string;
  defaultKeyword?: string;
  defaultPageNumber?: number;
  defaultPageLimit?: number;
  defaultFilter?: string;
  defaultSort?: string;
}) => {
  const keyword = options?.defaultKeyword ?? useSearchStore.getState().search.toLowerCase();
  const pageNumber = options?.defaultPageNumber ?? useSearchStore.getState().pageNumber;
  const pageLimit = options?.defaultPageLimit ?? useSearchStore.getState().pageLimit;
  const filter = options?.defaultFilter ?? useSearchStore.getState().filter;
  const sort = options?.defaultSort ?? useSearchStore.getState().sort;
  const setNumberPages = useSearchStore.getState().setNumberPages;
  // console.log(filter);

  const { data } = await axios.get(
    `${options?.url}?keyword=${keyword}&pageNumber=${pageNumber}&limit=${pageLimit}&filterOptions=${filter}&sortBy=${sort}`
  );

  // data should contain a property pages, which is the number of pages, which we can pass to zustand's setNumberPages
  setNumberPages(data?.pages);
  return data;
};

/**
 * @description - custom hook to retrieve user videos from the api
 * @param keyword - search keyword
 * @param pageNumber - page number, used for pagination
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @returns  - returns the query object
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 */
export default (options?: {
  key: string;
  url?: string;
  enabled?: boolean;
  keyword?: string;
  pageNumber?: number;
  pageLimit?: number;
  filter?: string;
  sort?: string;
  // onSuccess is a callback function that will be called on success, to do something with the data
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const query = useQuery(
    [options?.key],
    () =>
      fetchData({
        url: options?.url,
        defaultFilter: options?.filter,
        defaultKeyword: options?.keyword,
        defaultPageLimit: options?.pageLimit,
        defaultPageNumber: options?.pageNumber,
        defaultSort: options?.sort,
      }),
    {
      onSuccess: options?.onSuccess,
      // refetchInterval: 2000,
      retry: 1,
      onError: options?.onError,
      enabled: options?.enabled,
    }
  );
  return query;
};
