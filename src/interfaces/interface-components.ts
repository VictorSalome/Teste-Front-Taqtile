
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
  

  export interface ILoadingButtonProps {
    isLoading: boolean;
    text: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
  }

  export interface IInputSubmitRegisterFormProps {
    label: string;
    name: string;
    control: any;
    error?: FieldError;
    render: (args: {
      field: {
        value: any;
        onChange: (...event: any[]) => void;
        onBlur: () => void;
      };
    }) => JSX.Element;
  }

  export interface IButtonRedirectProps {
    to: string;
  }