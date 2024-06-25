import React, { KeyboardEvent } from "react";

import styles from './Input.module.css'

interface Props {
  className?: string
  value: string
  onChange(value: string): void
  onEnter?(): void
}

function Input({ value, onChange, className, onEnter }: Props) {

  function handleUsernameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.currentTarget.value);
  };

  async function handleInputKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onEnter?.();
    }
  };

  return (
    <input
      className={[styles.root, className].join(' ')}
      value={value}
      onChange={handleUsernameInputChange}
      onKeyDown={handleInputKeyPress}
    />
  )
}

export default Input
