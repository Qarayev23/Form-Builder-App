import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { textInput, selectInput, radioGroup, checkBox, baseURL } from '../constants';
import { ExtensionProps, FormElement, SavedFormProps } from '../types';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

const useFormBuilder = () => {
  const [content, setContent] = useState<FormElement[]>([]);
  const [selectedID, setSelectedID] = useState("");
  const [savedForm, setSavedForm] = useState<SavedFormProps[]>([]);
  const [editedFormData, setEditedFormData] = useState({ id: "", name: "" });

  useEffect(() => {
    setSavedForm(JSON.parse(localStorage.getItem('form')!) || []);
  }, [localStorage.getItem('form')]);

  const updateLocalStorageAndState = (updatedForms: SavedFormProps[]) => {
    localStorage.setItem('form', JSON.stringify(updatedForms));
    setSavedForm(updatedForms);
  };

  const addExtension = (extension: ExtensionProps, index?: number) => {
    const id = uuidv4();
    setSelectedID(id);
    const updatedContent = index !== undefined
      ? [...content.slice(0, index), { ...extension, id }, ...content.slice(index)]
      : [...content, { ...extension, id }];

    setContent(updatedContent);
  };

  const removeExtension = (id: string) => {
    const updatedContent = content.filter((item) => item.id !== id);
    setSelectedID(updatedContent[0]?.id);
    setContent(updatedContent);
  };

  const updateExtension = (id: string, value: string | string[] | boolean, field: string) => {
    setContent((prevFormContent) =>
      prevFormContent.map((item) =>
        item.id === id ? { ...item, settings: { ...item.settings, [field]: value } } : item
      )
    );
  };

  const handleSelectedSection = (id: string) => {
    setSelectedID(id);
  };

  const reorder = (sourceIndex: number, destinationIndex: number) => {
    const updatedContent = [...content];
    const [removed] = updatedContent.splice(sourceIndex, 1);
    updatedContent.splice(destinationIndex, 0, removed);
    setContent(updatedContent);
  };

  const deleteForm = async (id: string) => {
    try {
      await axios.delete(`${baseURL}${id}`);
      const updatedForms = savedForm.filter((item) => item.id !== id);
      setEditedFormData({ id: "", name: "" });
      setContent([]);
      updateLocalStorageAndState(updatedForms);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveFormToLocalStorage = (id: string, name: string) => {
    const updatedForms = [...savedForm, { elements: content, id, name }];
    updateLocalStorageAndState(updatedForms);
  };

  const postForm = async (name: string, navigate: NavigateFunction) => {
    const id = uuidv4();
    try {
      await axios.post(baseURL, { elements: content, id, name });
      saveFormToLocalStorage(id, name);
      navigate(`/form/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateForm = async (name: string, navigate: NavigateFunction) => {
    try {
      await axios.put(`${baseURL}${editedFormData.id}`, {
        elements: content,
        id: editedFormData.id,
        name
      });
      const updatedForms = savedForm.map((item: SavedFormProps) =>
      item.id === editedFormData.id
        ? { elements: content, id: editedFormData.id, name }
        : item
    );
      updateLocalStorageAndState(updatedForms);
      navigate(`/form/${editedFormData.id}`);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const editForm = (id: string) => {
    const targetForm = savedForm.find(item => item.id === id);
    const { elements, name } = targetForm ?? { elements: [], name: "" };
    setContent(elements);
    setSelectedID(elements[0]?.id);
    setEditedFormData({ id, name });
  };

  const resetForm = () => {
    setContent([]);
    setSelectedID("");
    setEditedFormData({ id: "", name: "" });
  };

  return {
    extensions: [textInput, selectInput, radioGroup, checkBox],
    content,
    selectedID,
    savedForm,
    editedFormData,
    addExtension,
    removeExtension,
    handleSelectedSection,
    updateExtension,
    reorder,
    postForm,
    deleteForm,
    updateForm,
    editForm,
    resetForm,
  };
};

export default useFormBuilder;
