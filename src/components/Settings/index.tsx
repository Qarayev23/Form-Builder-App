import { ChangeEvent, useEffect, useState } from 'react';
import styles from './settings.module.scss';
import { useFormBuilderProps } from '../../types';

const Settings = ({ form }: { form: useFormBuilderProps }) => {
    const { content, selectedID, updateExtension } = form;
    const [label, setLabel] = useState("")
    const [placeholder, setPlaceholder] = useState("")
    const [type, setType] = useState("")
    const [isMultiple, setIsMultiple] = useState("")
    const [choices, setChoices] = useState<(string)[]>([]);

    useEffect(() => {
        const selectedSettings = content.filter(item => item.id === selectedID)[0]?.settings;
        setLabel(selectedSettings?.label ?? "")
        setPlaceholder(selectedSettings?.placeholder ?? "")
        setChoices(selectedSettings?.options ?? []);
        setType(selectedSettings?.type ?? "")
        setIsMultiple(selectedSettings?.multiple?.toString() ?? "")
    }, [selectedID])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, type: string, index?: number | undefined) => {
        const newValue = e.target.value;

        switch (type) {
            case 'label':
                setLabel(newValue);
                updateExtension(selectedID, newValue, "label");
                break;
            case 'placeholder':
                setPlaceholder(newValue);
                updateExtension(selectedID, newValue, "placeholder");
                break;
            case 'choices':
                const newChoices = [...choices];
                newChoices[index!] = newValue;
                setChoices(newChoices);
                updateExtension(selectedID, newChoices, "options");
                break;
            case 'type':
                setType(newValue);
                updateExtension(selectedID, newValue, "type");
                break;
            case 'multiple':
                setIsMultiple(newValue);
                updateExtension(selectedID, newValue === "true", "multiple");
                break;
            default:
                break;
        }
    }

    const addInput = () => {
        setChoices((prevChoices) => [...prevChoices, ""]);
    }

    const removeInput = (index: number) => {
        const newChoices = [...choices]
        newChoices.splice(index, 1)
        setChoices(newChoices)
        updateExtension(selectedID, newChoices, "options");
    }

    return (
        <div className={`${styles.settings} card`}>
            <div className="card__header">
                <p className='card__title'>Settings</p>
            </div>
            <div className="card__body">
                <div className={styles.settings__holder}>
                    {
                        content.length > 0 &&
                        <>
                            <div className="form-group">
                                <label htmlFor="label">Label</label>
                                <input
                                    type="text"
                                    id="label"
                                    value={label}
                                    onChange={(e) => handleInputChange(e, 'label')} />
                            </div>
                            {
                                content.filter(item => item.id === selectedID)[0]?.extension === "select" &&
                                <div className="form-group">
                                    <label htmlFor="multiple">Multiple</label>
                                    <div className='select'>
                                        <select
                                            id="multiple"
                                            value={isMultiple}
                                            onChange={(e) => handleInputChange(e, 'multiple')}>
                                            <option value="false">False</option>
                                            <option value="true">True</option>
                                        </select>
                                        <img src="/svg/arrow.svg" className='select-icon' alt="arrow" />
                                    </div>
                                </div>
                            }
                            {
                                !!(content.filter(item => item.id === selectedID)[0]?.settings?.options) ?
                                    <div className="form-group">
                                        <label>Choices</label>
                                        {
                                            choices?.length > 0 && (
                                                <div className={styles.choice}>
                                                    {choices.map((choice, index) => (
                                                        <div className={styles.choice__group} key={index}>
                                                            <input
                                                                type="text"
                                                                value={choice}
                                                                onChange={(e) => handleInputChange(e, 'choices', index)} />
                                                            <button
                                                                type='button'
                                                                className={styles.removeBtn}
                                                                onClick={() => removeInput(index)}>
                                                                <svg>
                                                                    <use xlinkHref="/svg/close.svg#close" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        }
                                        <button type='button' onClick={addInput} className={styles.addBtn}>
                                            <svg>
                                                <use xlinkHref="/svg/plus.svg#plus" />
                                            </svg>
                                        </button>
                                    </div> :
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="placeholder">Placeholder</label>
                                            <input
                                                type="text"
                                                id="placeholder"
                                                value={placeholder}
                                                onChange={(e) => handleInputChange(e, 'placeholder')} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="type">Type</label>
                                            <div className='select'>
                                                <select
                                                    id="type"
                                                    value={type}
                                                    onChange={(e) => handleInputChange(e, 'type')}>
                                                    <option value="text">Text</option>
                                                    <option value="number">Number</option>
                                                </select>
                                                <img src="/svg/arrow.svg" className='select-icon' alt="arrow" />
                                            </div>
                                        </div>
                                    </>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Settings