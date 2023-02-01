import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
} from 'react'
import { DropdownOption, Item } from '../../Types/search';
import { rootUrl, api, useApi } from '../../Utils/api';
import { debounce } from '../../Utils/debounce'

interface ParamsState {
  q?: string;
  year_start?: string;
  year_end?: string;
  media_type?: string;
}

export const useSearch = () => {
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false)
  const [searchActive, setSearchActive] = useState<boolean>(false)
  const [params, setParams] = useState<ParamsState>({})
  const { data, isLoading } = useApi({
    url: `${rootUrl}${api.search}`,
    params,
    skip: !params.q?.length,
  })
  const { collection } = data || {}
  const { items } = collection || {}
  const ref = useRef<HTMLInputElement>(null);

  const options = useMemo(() => {
    if (!items?.length) {
      setDropdownOpened(false)

      return []
    }
 
    setDropdownOpened(true)

    return items.map(({ data, links, href: collectionUrl }: Item) => {
      const {
        title,
        photographer,
        location,
        nasa_id,
      } = data[0] || {}
      const { href: previewImage } = links[0] || {}

      return {
        title,
        previewImage,
        photographer,
        location,
        nasa_id,
        collectionUrl,
      } as DropdownOption
    })
  }, [items])

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = event.target || {}

    debounce(() => {
      setParams({
        ...params,
        media_type: value ? 'image' : undefined,
        [name]: value,
      })
    }, 500)
  }

  const clickOutside = (event: MouseEvent): void => {
    const { current } = ref || {}
    const clickTarget = event.target as Element
    
    if (
      clickTarget !== current
      && ![...current?.children || []].includes(clickTarget) 
      && dropdownOpened
    ) {
      setDropdownOpened(false)
    }
  }

  const onClick = () => {
    if (!dropdownOpened && !!items?.length) {
      setDropdownOpened(true)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', clickOutside)

    return () => {
      document.body.removeEventListener('click', clickOutside)
    }
  }, [dropdownOpened])

  return {
    options,
    onChange,
    onClick,
    dropdownOpened,
    searchActive,
    setSearchActive,
    isLoading,
    ref,
  }
}
