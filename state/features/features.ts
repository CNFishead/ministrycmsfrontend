import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useSearchStore } from '../search/search';
import { useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import { message } from 'antd';

export const fetchAllFeatures = async () => {
  const response = await axios.get(
    `/admin/features?keyword=&pageNumber=1&partnerid=`
  );
  return response.data;
};

export const useAllFeatures = (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const query = useQuery(['allFeatures'], () => fetchAllFeatures(), {
    onSuccess,
    onError,
  });
  return query;
};

export const updateUserFeatures = async (features: string[]) => {
  const response = await axios.post(`/gateway/subnewplan`, {
    features,
  });
  return response.data;
};

export const useUpdateUserFeatures = (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const queryClient = useQueryClient();
  return useMutation((data: string[]) => updateUserFeatures(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
      message.success(
        data.message || 'Your features have been updated successfully'
      );
      onSuccess && onSuccess(data);
    },
    onError: (error: Error) => {
      console.log(error);
      errorHandler(error);
      onError && onError(error);
    },
  });
};
