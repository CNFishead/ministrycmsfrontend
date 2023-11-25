import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';

//query to retrieve user videos
export const fetchData = async (limit: number = 3) => {
  const { data } = await axios.get(
    `https://blog.truthcasting.com/wp-json/wp/v2/posts?&per_page=${limit}`
  );
  return data;
};

/**
 * @description - custom hook to retrieve data from the api
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @param limit - limit of posts to retrieve
 * @returns  - returns the query object
 *
 * @author Austin Howard
 * @version 1.0
 * @since 1.0
 */
export default (
  limit: number,
  // onSuccess is a callback function that will be called on success, to do something with the data
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const query = useQuery(['newsArticles', limit], () => fetchData(limit), {
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
