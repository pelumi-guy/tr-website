import { UseFormRegister, UseFormHandleSubmit, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { Location, Price } from "./property"

export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    handleClick?: () => void
}

export interface ProfileProps {
    type: string,
    name: string,
    avatar: string,
    email: string,
    properties: Array | undefined
}

export interface PropertyProps {
    _id: string,
    title: string,
    description: string,
    location: Location,
    price: Price,
    photos: Array<string>,
    creator: string
}

export interface OldFormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    propertyImage: { name: string, url: string },
}


export interface FormProps {
  type: string;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  setValue: UseFormSetValue<any>; // For setting dynamic fields
  watch: UseFormWatch<any>;       // For watching dynamic fields
  formLoading: boolean;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  // We'll manage image state inside the component, so these props can be removed/changed
  // handleImageChange: (file: File) => void;
  // propertyImage: { name: string, url: string };
}