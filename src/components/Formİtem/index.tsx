import { FormElement } from "../../types";

const FormItem = ({ item, fromModal }: { item: FormElement, fromModal?: boolean }) => {
    return (
        <>
            {item?.settings?.type === "radio" || item?.settings?.type === "checkbox" ? (
                <div className="form-group">
                    <label>{item?.settings?.label}</label>
                    <div className="input-group">
                        {item?.settings?.options?.map((option, index) => (
                            <div className="input-group__item" key={index}>
                                <input type={item?.settings?.type} id={`${fromModal ? `modal ${item.id}${index}` : `${item.id}${index}`}`} name={item.id} value={option} />
                                <label htmlFor={`${fromModal ? `modal ${item.id}${index}` : `${item.id}${index}`}`} >{option}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                item?.settings?.type === "text" || item?.settings?.type === "number" ? (
                    <div className="form-group">
                        <label htmlFor={item.id}>{item?.settings?.label}</label>
                        <input type={item?.settings?.type} placeholder={item?.settings.placeholder} id={item.id} />
                    </div>
                ) : (
                    item.extension === "select" && (
                        <div className="form-group">
                            <label htmlFor={item.id}>{item?.settings?.label}</label>
                            <div className="select">
                                <select id={item.id} multiple={item?.settings?.multiple}>
                                    {item?.settings?.options?.map((option, index) => (
                                        <option value={option} key={index}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <img src="/svg/arrow.svg" className="select-icon" alt="arrow" />
                            </div>
                        </div>
                    )
                )
            )}
        </>
    );
};

export default FormItem;
