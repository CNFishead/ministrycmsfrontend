import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';

//query to retrieve user videos
export const fetchData = async (videoId?: string) => {
  const { data } = await axios.get(
    `/user/viewsByGeolocation${videoId ? `?videoId=${videoId}` : ''}`
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
export default (options?: {
  videoId?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const query = useQuery(
    ['viewsByGeolocation', options?.videoId],
    () => fetchData(options?.videoId),
    {
      onSuccess: (data) => {
        if (options?.onSuccess) {
          options.onSuccess(data);
        }
      },
      onError: (error: Error) => {
        errorHandler(error);
        if (options?.onError) {
          options.onError(error);
        }
      },
    }
  );
  return query;
};
