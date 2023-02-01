import classNames from 'classnames'
import YearPicker from '../YearPicker/YearPicker'
import Loader from '../Loader/Loader'
import Dropdown from './Partials/Dropdown/Dropdown'
import { useSearch } from './useSearch'
import styles from './Search.module.scss'

export interface OwnProps {
  children?: JSX.Element;
}

function Search() {
  const {
    options,
    onChange,
    onClick,
    isLoading,
    ref,
    dropdownOpened,
    searchActive,
    setSearchActive,
  } = useSearch()

  return (
    <div className={styles.container}>
      <div className={classNames(styles.search, !searchActive && styles['search--button'])}>
        <input
          ref={ref}
          placeholder="Search"
          name="q"
          className={classNames(styles.input, !searchActive && styles['input--button'])}
          onChange={onChange}
          onClick={() => {
            if (searchActive) onClick()
          
            setSearchActive(true)
          }}
          readOnly={!searchActive}
        />        

        {isLoading && <Loader />}

        {dropdownOpened && (
          <Dropdown options={options} loading={isLoading} />
        )}
      </div>

      {searchActive && (
        <div className={styles['date-pickers']}>
          <YearPicker name="year_start" placeholder="Year start" onChange={onChange} />
          <YearPicker name="year_end" placeholder="Year end" onChange={onChange} />
        </div>
      )}
    </div>
  )
}

export default Search
