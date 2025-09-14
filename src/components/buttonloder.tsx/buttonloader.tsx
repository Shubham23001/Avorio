import { JSX } from 'react';
import { Loader2 } from 'lucide-react';
import React = require('react');

interface ButtonLoaderProps {
  colorClassName?: string;
}

const ButtonLoader = ({ colorClassName = 'text-white' }: ButtonLoaderProps): JSX.Element => {
  return (
    <div>
      <Loader2 />
    </div>
  );
};

export default ButtonLoader;