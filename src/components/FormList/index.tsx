import { Link } from 'react-router-dom'
import styles from './formList.module.scss'
import { useFormBuilderProps } from '../../types'

const FormList = ({ form }: { form: useFormBuilderProps }) => {
    const { deleteForm, editForm , savedForm } = form

    return (
        <>
            {
                savedForm.length > 0 ? (
                    <div className='card'>
                        <div className="card__header">
                            <p className='card__title'>Your forms</p>
                        </div>
                        <div className="card__body">
                            <div className={styles.savedForm}>
                                {
                                    savedForm.map((item) => (
                                        <div className={styles.savedForm__item} key={item.id}>
                                            <Link className={styles.savedForm__link} to={`/form/${item.id}`} >
                                                {item.name}
                                            </Link>
                                            <button className={styles.savedForm__btn} onClick={() => editForm(item.id)}>
                                                <svg>
                                                    <use xlinkHref="/svg/edit.svg#edit" />
                                                </svg>
                                            </button>
                                            <button className={styles.savedForm__btn} onClick={() => deleteForm(item.id)}>
                                                <svg>
                                                    <use xlinkHref="/svg/trash.svg#trash" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

export default FormList