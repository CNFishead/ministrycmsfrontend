import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';

//query to retrieve user videos
export const fetchData = async () => {
  const { data } = await axios.get(`/user/next-payment-date`);
  return data;
};

/**
 * @description - custom hook to retrieve data from the api
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @returns  - returns the query object
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 * @lastModifiedOn 2023-04-13T10:10:55.000-05:00
 */
export const useNextPaymentDate = (
  // onSuccess is a callback function that will be called on success, to do something with the data
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const query = useQuery(['next-payment'], () => fetchData(), {
    onSuccess,
    onError: (error: Error) => {
      errorHandler(error);
      if (onError) {
        onError(error);
      }
    },
  });
  return query;
};
