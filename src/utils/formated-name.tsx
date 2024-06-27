import React from 'react';

interface FormattedNameProps {
  name: string;
}

export const FormattedName: React.FC<FormattedNameProps> = ({ name }) => {
  const formatName = (name: string) => {
    if (!name) return '';
    return `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
  };

  return <span>{formatName(name)}</span>;
};
