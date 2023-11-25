import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useSearchStore } from '../search/search';
import { useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import { message } from 'antd';
import { useUser } from '../auth';

/**
 * @description - custom hook to retrieve the receipts details of the current user
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @returns  - returns the query object
 *
 * @author Nadia Dorado
 * @since 1.0
 * @version 1.0.1
 * @lastModifiedBy Austin Howard
 * @lastModified   2023-05-30T12:37:43.000-05:00
 */

// get the user data from zustand
//query to retrieve the receipt data from the user
export const fetchReceiptData = async (id?: string, keyword?: string) => {
  const response = await axios.get(`/receipt?sortBy=${id}&keyword=${keyword}`);
  return response.data;
};

export const useReceiptData = (
  id?: string,
  keyword?: string,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const query = useQuery(['receiptData'], () => fetchReceiptData(id, keyword), {
    onError,
    onSuccess,
  });
  return query;
};

const downloadReceipt = async (receiptId: any) => {
  const response = await axios.get(`/receipt/${receiptId}/download`, {
    responseType: 'arraybuffer',
  });

  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);

  const filenameHeader = response.headers['content-disposition'];
  const encodedFilename = filenameHeader.split('filename=')[1];
  const decodedFilename = encodedFilename.replace(/_/g, ' ');

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', decodedFilename);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const useDownloadReceipt = (
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  const queryClient = useQueryClient();
  const mutate = useMutation(
    (receiptId: any) => {
      return downloadReceipt(receiptId);
    },
    {
      onError: (error: any) => {
        errorHandler(error);
        onError && onError(error);
      },
      onSuccess: (data: any) => {
        onSuccess && onSuccess(data);
      },
    }
  );
  return mutate;
};
