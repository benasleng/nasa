import { ReactNode } from 'react';
import Button from '../Button/Button';
import classNames from 'classnames';
import styles from './PageLayout.module.scss'

export interface OwnProps {
  children?: ReactNode;
  goBack?: () => void | null;
  center?: boolean;
}

function PageLayout({ children, goBack, center = false }: OwnProps) {
  return (
    <div className={classNames(styles.container, center && styles['container--centered'])}>
      {goBack && (
        <Button
          variant="secondary"
          icon={<img src="/back.png" alt="back"/>}
          onClick={goBack}
          className={styles.sticky}
        >
          Go back
        </Button>
      )}

      <div className={classNames(styles.wrap, center && styles['wrap--centered'])}>
        {children}
      </div>
    </div>
  )
}

export default PageLayout
