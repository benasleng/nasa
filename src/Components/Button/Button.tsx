import { ReactNode } from 'react'
import classNames from 'classnames';
import styles from './Button.module.scss'

export interface OwnProps {
  children: ReactNode,
  icon?: JSX.Element;
  variant?: 'primary' | 'secondary';
  className?: string;
  iconClassName?: string;
  onClick: () => void;
}

function Button({
  onClick,
  icon,
  children,
  variant = 'primary',
  iconClassName = '',
  className = '',
}: OwnProps) {
  return (
    <div className={classNames(styles.container, className)}>
      <button
        onClick={onClick}
        className={classNames(styles.button, styles[`button--${variant}`])}
      >
        {icon && (
          <div className={classNames(styles.icon, iconClassName)}>
            {icon}
          </div>
        )}

        {children}
      </button>
    </div>
  )
}

export default Button
