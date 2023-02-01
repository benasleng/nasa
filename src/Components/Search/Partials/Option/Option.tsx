import { Link } from 'react-router-dom'
import { DropdownOption } from '../../../../Types/search';
import { formatText } from '../../../../Utils/text';
import styles from './Option.module.scss'

interface OwnProps {
  option: DropdownOption;
}

function Option({ option }: OwnProps) {
  const {
    title, previewImage, location, photographer, nasa_id: nasaId,
  } = option

  return (
    <Link to={`/show/${nasaId}`} className={styles.option}>
      <div className={styles['option-preview']}>
        <img src={previewImage} alt={title} />
      </div>

      <div className={styles['option-text']}>
        <span className={styles['option-text__title']}>{title}</span>
        <span className={styles['option-text__subtitle']}>{formatText(location)}</span>

        {photographer && (
          <span className={styles['option-text__subtitle']}>{formatText(photographer)}</span>
        )}
      </div>
    </Link>
  )
}

export default Option
