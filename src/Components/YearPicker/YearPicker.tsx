import styles from './YearPicker.module.scss'

interface OwnProps {
  name: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function YearPicker({ name, placeholder, onChange }: OwnProps) {
  const renderYearsList = () => {
    const thisYear = (new Date()).getFullYear();
    const maxOffset = thisYear - 1957;

    const allYears = [...Array(maxOffset).keys()].reduce((acc: number[], curr: number) => {
      return [...acc, thisYear - curr]
    }, [])

    const years = allYears.map((year) => <option key={year}>{year}</option>)

    return name === 'year_start' ? years.reverse() : years
  }

  
  return (
    <div className={styles.wrap}>
      <select
        name={name}
        className={styles.select}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled selected>{placeholder}</option>
        )}

        {renderYearsList()}
      </select>
    </div>
  );
}

export default YearPicker