import { rootUrl, api, useApi } from '../../Utils/api';

export const useShowPageData = (id?: string) => {
  const { data, isLoading } = useApi({
    url: `${rootUrl}${api.search}`,
    params: {
      nasa_id: decodeURIComponent(id || ''),
      media_type: 'image',
    },
    skip: !id,
  })
  const { collection } = data || {}
  const { items } = collection || {}
  const firstItem = items?.[0]

  return {
    data: firstItem,
    isLoading,
  }
}