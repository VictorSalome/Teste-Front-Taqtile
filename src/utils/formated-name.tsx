import React from 'react';
import { IFormattedNameProps } from '../interfaces/interface-utils';

export const FormattedName: React.FC<IFormattedNameProps> = ({ name }) => {
  const formatName = (name: string) => {
    if (!name) return '';
    return `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
  };

  return <span>{formatName(name)}</span>;
};
