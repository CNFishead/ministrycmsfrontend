import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useDateRangeStore } from './dateRange';
import errorHandler from '@/utils/errorHandler';
import { useQueryClient } from '@tanstack/react-query';

//query to retrieve user videos
export const fetchData = async () => {
  const { startDate, endDate } = useDateRangeStore.getState();
  const { data } = await axios.get(
    `/user/videosTotal?startDate=${startDate}&endDate=${endDate}`
  );
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
 */
export const useTotalVideos = (
  // onSuccess is a callback function that will be called on success, to do something with the data
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const query = useQuery(['videos'], () => fetchData(), {
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
