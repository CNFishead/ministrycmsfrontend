import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { message } from "antd";
import { useRouter } from "next/navigation";
import errorHandler from "@/utils/errorHandler";
import decryptData from "@/utils/decryptData";
import { useSearchStore as store } from "@/state/search/search";

const fetchData = async (url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: any, options?: any) => {
  let response;
  switch (method) {
    case "GET":
      const {
        defaultKeyword = options?.defaultKeyword || store.getState().search,
        defaultPageNumber = options?.defaultPageNumber || store.getState().pageNumber,
        defaultPageLimit = options?.defaultPageLimit || store.getState().pageLimit,
        defaultFilter = `${options?.defaultFilter ?? ""}${
          store.getState().filter ? `|${store.getState().filter}` : ""
        }`,
        defaultSort = options?.defaultSort || store.getState().sort,
        defaultInclude = options?.defaultInclude || store.getState().include,
      } = options || {};

      response = await axios.get(url, {
        params: {
          search: defaultKeyword,
          pageNumber: defaultPageNumber,
          pageLimit: defaultPageLimit,
          filter: defaultFilter,
          sort: defaultSort,
          include: defaultInclude,
        },
      });

      break;
    case "POST":
      response = await axios.post(url, data);
      break;
    case "PUT":
      response = await axios.put(url, data);
      break;
    case "DELETE":
      response = await axios.delete(url, { data });
      break;
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
  if (method === "GET" && typeof response.data.payload === "string") {
    response.data.payload = JSON.parse(decryptData(response.data.payload));
  }
  return response.data;
};
// Reusable Hook
const useApiHook = (options: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url?: string;
  key: string | string[];
  filter?: any;
  sort?: any;
  include?: any;
  queriesToInvalidate?: string[];
  successMessage?: string;
  redirectUrl?: string;
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  onSuccessCallback?: (data: any) => void;
  onErrorCallback?: (error: any) => void;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    method,
    url,
    key,
    filter,
    sort,
    include,
    queriesToInvalidate,
    successMessage,
    redirectUrl,
    enabled = true,
    refetchOnWindowFocus = false,
    onSuccessCallback,
    onErrorCallback,
  } = options;

  const queryKey = typeof key === "string" ? [key] : key;

  // For GET requests, use useQuery
  if (method === "GET") {
    return useQuery({
      queryKey,
      queryFn: () =>
        fetchData(url!, method, undefined, { defaultFilter: filter, defaultSort: sort, defaultInclude: include }),
      enabled,
      refetchOnWindowFocus,
      retry: 1,
      meta: {
        errorMessage: "An error occurred while fetching data",
      },
    });
  }

  // For POST, PUT, DELETE requests, use useMutation
  return useMutation({
    mutationFn: (data: {url?: string, formData?: any}) => fetchData(url ? url : data.url as any, method, data),
    onSuccess: (data: any) => {
      if (successMessage) {
        message.success(successMessage);
      }

      queriesToInvalidate?.forEach((query: string) => {
        queryClient.invalidateQueries([query] as any);
      });

      if (redirectUrl) {
        router.push(redirectUrl);
      }

      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError: (error: any) => {
      errorHandler(error);
      if (onErrorCallback) {
        onErrorCallback(error);
      }
    },
  });
};

export default useApiHook;
