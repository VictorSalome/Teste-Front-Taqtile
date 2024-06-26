
import { UseFormRegister, FieldError } from 'react-hook-form';

export interface IHeaderTitleProps {
    title: string;
  }


  export interface IInputFormProps {
    label: string;
    name: string;
    type?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    showPasswordToggle?: boolean;
  }
  