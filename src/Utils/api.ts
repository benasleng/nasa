import { useContext } from 'react'
import { useQuery } from 'react-query'
import { ErrorBoundaryContext } from '../ErrorBoundary'
import { ResponseData } from '../Types/search'

export interface ApiResponse {
  data?: ResponseData,
  isLoading: boolean,
}

export interface Params {
  url: string,
  params?: {[key: string]: string } | {},
  skip?: boolean,
}

export const rootUrl = 'https://images-api.nasa.gov'

export const api = {
  search: '/search'
}

export const createUrlWithParams = (
  url: string,
  params: {[key: string]: string } | null,
): string => {
  if (!params) return url

  const searchParams = new URLSearchParams(params);
  return `${url}?${searchParams?.toString() || ''}`
}

export const useApi = ({
  url,
  params = {},
  skip = false,
}: Params): ApiResponse => {
  const { setError } = useContext(ErrorBoundaryContext)

  const { data, isLoading } = useQuery({
    queryKey: [params],
    queryFn: async () => {
      if (!skip) {        
        const response = await fetch(createUrlWithParams(url, params))

        if (!response?.ok) {
          setError('Something went wrong')
        }
  
        return response.json()
      }
    },
    onError: ({ message }) => {
      setError(message || 'Something went wrong')
    },
    refetchOnWindowFocus: false,
  })

  return {
    data,
    isLoading,
  }
}