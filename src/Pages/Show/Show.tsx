import { useNavigate, useParams } from 'react-router-dom'
import * as DOMPurify from 'dompurify';
import { useShowPageData } from './useShowPageData'
import styles from './Show.module.scss'
import PageLayout from '../../Components/PageLayout/PageLayout'
import { formatText } from '../../Utils/text'
import Loader from '../../Components/Loader/Loader'
import { Fragment } from 'react';

function Show() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useShowPageData(id)
  const { data: dataArray, links: imagesLinks } = data || {}
  const image = imagesLinks?.[0]

  const {
    title,
    description,
    photographer,
  } = dataArray?.[0] || {}

  const handleGoBack = () => {
    navigate('/')
  }

  function renderDescription() {
    if (!description) return null

    const sanitizer = DOMPurify.sanitize(description)

    return <div dangerouslySetInnerHTML={{__html: sanitizer }} />
  }
  
  const renderContent = () => {
    if (isLoading) {
      return <Loader color="secondary" />
    }

    return (
      <div className={styles.container}>
        {(!data && !isLoading) ? (
          <div className={styles.empty}>
            <h2>No data found. Try again.</h2>
          </div>
        ) : (
          <Fragment>
            {image && (
              <div className={styles.image}>
                <img src={image.href} alt={image.rel} key={image.href} />

                {photographer && (
                  <div className={styles['images-subtitle']}>Photographer: {formatText(photographer)}</div>
                )}
              </div>
            )}
            
            <div className={styles.content}>
              <h2 className={styles['content-title']}>{title}</h2>

              <div className={styles.divider} />

              {renderDescription()}
            </div>
          </Fragment>
        )}
      </div>
    )
  }

  return (
    <PageLayout goBack={handleGoBack}>
      {renderContent()}
    </PageLayout>
  )
}

export default Show
