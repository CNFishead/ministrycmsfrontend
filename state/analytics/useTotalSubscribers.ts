import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';

//query to retrieve user videos
export const fetchData = async (
  startDate: string = '',
  endDate: string = ''
) => {
  const { data } = await axios.get(
    `/user/subscribersTotal?startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};

/**
 * @description - custom hook to retrieve data from the api
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @param startDate - start date for the query, if not provided, will be empty string
 * @param endDate - end date for the query, if not provided, will be empty string
 * @returns  - returns the query object
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 */
export default (
  startDate?: string,
  endDate?: string,
  // onSuccess is a callback function that will be called on success, to do something with the data
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const query = useQuery(
    ['totalSubscribers', startDate, endDate],
    () => fetchData(startDate, endDate),
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
