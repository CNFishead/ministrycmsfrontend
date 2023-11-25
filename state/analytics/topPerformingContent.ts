import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';

//query to retrieve user videos
export const fetchData = async (value: string = '') => {
  const { data } = await axios.get(`/user/topPerformingContent?value=${value}`);
  return data;
};

/**
 * @description - custom hook to retrieve data from the api
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @param value - value for the query, if not provided, will be empty string
 * @returns  - returns the query object
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastModifiedBy Austin Howard
 * @lastModifiedOn 2023-04-13T09:56:45.000-05:00
 */
export default (
  value: string,
  // onSuccess is a callback function that will be called on success, to do something with the data
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const query = useQuery(
    ['topPerformingContent', value],
    () => fetchData(value),
    {
      onSuccess,
      onError: (error: Error) => {
        errorHandler(error);
        if (onError) {
          onError(error);
        }
      },
    }
  );
  return query;
};
