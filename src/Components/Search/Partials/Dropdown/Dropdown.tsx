import { Fragment } from 'react'
import { DropdownOption } from '../../../../Types/search';
import Loader from '../../../Loader/Loader';
import Option from '../Option/Option'
import styles from './Dropdown.module.scss'

interface OwnProps {
  options?: DropdownOption[];
  loading?: boolean;
}

function Dropdown({ options, loading = false }: OwnProps) {
  if (!options?.length && !loading) return null

  return (
    <Fragment>
      <div className={styles.options} id="options-dropdown">
        {loading ? (
          <Loader />
        ) : (
          <div className={styles['options-list']}>
            {options?.map((option) => {
              return <Fragment key={option.title}><Option option={option} /></Fragment>
            })}
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default Dropdown
