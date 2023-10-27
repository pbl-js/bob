'use client';

import React from 'react';

type Props = {
  className: string;
  children: React.ReactNode;
  handleClick: () => void;
};

export function Button({ className, handleClick, children }: Props) {
  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
