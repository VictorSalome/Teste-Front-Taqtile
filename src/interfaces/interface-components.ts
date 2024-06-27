
import { UseFormRegister, FieldError, Control } from 'react-hook-form';

export interface IHeaderTitleProps {
    title: string;
    className?: string
  }


  export interface IInputFormProps {
    label: string;
    name: string;
    type?: string;
    register: UseFormRegister<any>;
    control?: UseFormRegister<any>;
    error?: FieldError;
    showPasswordToggle?: boolean;
  }
  