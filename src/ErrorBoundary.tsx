import { createContext, ReactNode, useState } from "react";
import styles from './ErrorBoundary.module.scss'

interface OwnProps {
  children: ReactNode,
}

interface ContextType {
  setError: React.Dispatch<React.SetStateAction<string>>
}

export const ErrorBoundaryContext = createContext<any>({} as ContextType)

const ErrorBoundary = ({ children }: OwnProps) => {
  const [error, setError] = useState<string>('')

  return (
    <ErrorBoundaryContext.Provider value={[error, setError]}>
      {children}

      {error && (
        <div className={styles.error}>{error}</div>
      )}
    </ErrorBoundaryContext.Provider>
  )
}

export default ErrorBoundary