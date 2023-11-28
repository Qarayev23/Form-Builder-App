import { Draggable, Droppable } from 'react-beautiful-dnd';
import styles from './elements.module.scss';
import { getStyle } from '../../utils';
import { useEffect, useState } from 'react';
import { useFormBuilderProps } from '../../types';

const Elements = ({ form, element }: { form: useFormBuilderProps; element: React.RefObject<HTMLDivElement> }) => {
    const { extensions, addExtension } = form;
    const [width, setWidth] = useState<number | undefined>()

    useEffect(() => {
        setWidth(element?.current?.clientWidth);
    }, [element]);

    window.onresize = () => {
        setWidth(element?.current?.clientWidth);
    };

    return (
        <div className={`${styles.elements} card`}>
            <div className="card__header">
                <p className='card__title'>Elements</p>
            </div>
            <div className='card__body card__body--elements'>
                <Droppable droppableId="Elements" isDropDisabled={true}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={snapshot.isDraggingOver ? `${styles.element} ${styles.dragactive}` : `${styles.element}`}>
                            {extensions.map((extension, index) => (
                                <Draggable draggableId={extension.title} index={index} key={index}>
                                    {(provided, snapshot) => (
                                        <div className={snapshot.isDragging ? `${styles.element__holder} ${styles.drag}` : `${styles.element__holder}`}>
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                style={getStyle(provided.draggableProps.style, snapshot, width)}
                                                className={snapshot.isDragging ? `${styles.element__item} ${styles.drag}` : `${styles.element__item}`}
                                                onClick={() => addExtension(extension)}>
                                                {
                                                    snapshot.isDragging ?
                                                        <p>{extension.title}</p>
                                                        :
                                                        <>
                                                            <div className={styles.element__icon}>
                                                                <img src={extension.icon} alt={extension.title} />
                                                            </div>
                                                            <p className={styles.element__title}>{extension.title}</p>
                                                        </>
                                                }
                                            </div>
                                            {snapshot.isDragging &&
                                                <div
                                                    className={`${styles.element__item} ${styles.copy}`}
                                                    onClick={() => addExtension(extension)}>
                                                    <div className={styles.element__icon}>
                                                        <img src={extension.icon} alt={extension.title} />
                                                    </div>
                                                    <p className={styles.element__title}>{extension.title}</p>
                                                </div>
                                            }
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    )
}

export default Elements