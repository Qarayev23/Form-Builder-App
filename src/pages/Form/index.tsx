import { useEffect, useState } from "react"
import { Link, Params, useParams } from "react-router-dom"
import FormItem from "../../components/Formİtem"
import styles from "./form.module.scss"
import axios from "axios"
import { baseURL } from "../../constants"
import { SavedFormProps } from "../../types"

const Form = () => {
    const { id } = useParams<Params>()
    const [form, setForm] = useState<SavedFormProps>({ name: "", id: "", elements: [] })

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`${baseURL}/${id}`)
                setForm(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        getData();
    }, [id])

    return (
        <div className={styles.form}>
            {
                form?.elements?.length > 0 ? (
                    <>
                        <h1 className={styles.form__title}>{form?.name}</h1>
                        {
                            form?.elements?.map((item) => (
                                <div className="form-wrapper" key={item.id}>
                                    <FormItem item={item} />
                                </div>
                            ))
                        }
                    </>
                ) : (
                    <h1 className={styles.form__title}>Form not found</h1>
                )
            }

            <Link to="/" className={`${styles.form__btn} btn btn--green`}>Back to home</Link>
        </div>
    )
}

export default Form