import { NavigateFunction } from "react-router-dom";

export interface FormSettings {
    type?: string;
    label: string;
    placeholder?: string;
    options?: string[];
    multiple?: boolean;
}

export type ExtensionProps = {
    extension: string;
    title: string;
    icon: string;
    settings: FormSettings;
}

export interface FormElement extends ExtensionProps {
    id: string;
}

export interface SavedFormProps {
    elements: FormElement[];
    id: string;
    name: string;
}

export interface useFormBuilderProps {
    content: FormElement[];
    selectedID: string;
    updateExtension: (id: string, value: string | string[] | boolean, field: string) => void;
    addExtension: (extension: ExtensionProps, index?: number) => void;
    removeExtension: (id: string) => void;
    handleSelectedSection: (id: string) => void;
    reorder: (sourceIndex: number, destinationIndex: number) => void;
    extensions: ExtensionProps[];
    savedForm: SavedFormProps[];
    editedFormData: { id: string, name: string };
    postForm: (name: string, navigate: NavigateFunction) => void;
    deleteForm: (id: string) => void;
    updateForm: (name: string, navigate: NavigateFunction) => void;
    editForm: (id: string) => void;
    resetForm: () => void;
  }