import classNames from 'classnames';
import styles from './Loader.module.scss'

interface OwnProps {
  color?: 'primary' | 'secondary';
}

function Loader({ color = 'primary'}: OwnProps) {
  return (
    <div className={styles.loader}>
      <div className={classNames(styles['loader-spinner'], styles[`loader-spinner--${color}`])} />
    </div>
  )
}

export default Loader
