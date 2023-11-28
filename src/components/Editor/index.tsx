import { forwardRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styles from './editor.module.scss';
import { getStyle } from '../../utils';
import FormItem from '../Formİtem';
import { useFormBuilderProps } from '../../types';

const Editor = forwardRef<HTMLDivElement, { form: useFormBuilderProps }>(({ form }, ref) => {
    const { content, selectedID, editedFormData, handleSelectedSection, removeExtension, resetForm } = form;

    return (
        <div className={`${styles.editor} card`}>
            <div className="card__header">
                <p className="card__title">Editor</p>
                {editedFormData?.name &&
                    <div className="card__caption">
                        <p>{editedFormData?.name}</p>
                        <button type='button' onClick={() => resetForm()}>Create new form</button>
                    </div>
                }
            </div>
            <div className="card__body card__body--editor">
                <Droppable droppableId="Editor">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={snapshot.isDraggingOver ? `${styles.editor__holder} ${styles.dragactive}` : `${styles.editor__holder}`}>
                            <div ref={ref}>
                                {content.map((item, index) => (
                                    <Draggable draggableId={item.id} index={index} key={item.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                                style={getStyle(provided.draggableProps.style, snapshot)}
                                                className={`${item.id === selectedID ? `active form-wrapper` : "form-wrapper"} ${snapshot.isDragging ? "drag" : ''
                                                    }`}
                                                onClick={() => handleSelectedSection(item.id)}>
                                                <FormItem item={item} />
                                                <div className="form-wrapper__icons">
                                                    <button
                                                        type="button"
                                                        className="trash-icon"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeExtension(selectedID);
                                                        }}>
                                                        <svg>
                                                            <use xlinkHref="/svg/trash.svg#trash" />
                                                        </svg>
                                                    </button>
                                                    <div {...provided.dragHandleProps}>
                                                        <img src="/svg/drag.svg" alt="Drag icon" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
});

export default Editor;
