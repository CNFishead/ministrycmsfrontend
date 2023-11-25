import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useSearchStore } from '../search/search';
import { useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import { message } from 'antd';

//query to retrieve the billing data from the user
export const fetchBillingData = async () => {
  const { data } = await axios.get(`/gateway/queryone`);

  return data;
};

export const updateBillingData = async (data: any) => {
  const { data: billingData } = await axios.put(
    `/gateway/updatecustomervault`,
    data
  );

  return billingData;
};

/**
 * @description - custom hook to retrieve the Billing of the current user
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @returns  - returns the query object
 *
 * @author Ethan Cannelongo
 * @version 1.0
 * @since 1.0
 */
export const useBillingData = (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const query = useQuery(['billingData'], () => fetchBillingData(), {
    onError,
    onSuccess,
  });
  return query;
};

export const useUpdateBillingData = (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const queryClient = useQueryClient();
  const mutate = useMutation(
    (data: any) => {
      return updateBillingData(data);
    },
    {
      onError: (error: any) => {
        errorHandler(error);
        onError && onError(error);
      },
      onSuccess: (data: any) => {
        message.success('Billing Info updated successfully');
        queryClient.invalidateQueries(['billingData']);
        queryClient.invalidateQueries(['user']);

        onSuccess && onSuccess(data);
      },
    }
  );
  return mutate;
};
