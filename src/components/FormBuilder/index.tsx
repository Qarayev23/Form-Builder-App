import styles from './formBuilder.module.scss';
import Elements from '../Elements';
import Editor from '../Editor';
import Settings from '../Settings';
import { useRef } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useFormBuilderProps } from '../../types';

const FormBuilder = ({ form, openModal }: { form: useFormBuilderProps, openModal: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const element = ref
  const { extensions, addExtension, reorder } = form;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) return;


    if (source.droppableId === "Elements" && destination.droppableId === "Editor") {
      addExtension(extensions[source.index], destination.index);
    }

    if (source.droppableId === "Editor" && destination.droppableId === "Editor") {
      reorder(source.index, destination.index);
    }
  };

  return (
    <>
      <button type="button" className={`${styles.saveBtn} btn btn--green`} onClick={openModal}>
        <img src="/svg/save.svg" alt="Save icon" />
        Save form
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.form__builder}>
          <Elements form={form} element={element} />
          <Editor form={form} ref={ref} />
          <Settings form={form} />
        </div>
      </DragDropContext>
    </>
  );
};

export default FormBuilder;