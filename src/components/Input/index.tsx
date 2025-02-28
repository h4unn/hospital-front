"use client";
import cn from "classnames/bind";
import styles from "./Input.module.scss";
import { FieldError } from "react-hook-form";

const cx = cn.bind(styles);

type InputProps = {
  label?: string;
  type?: "text" | "password" | "email" | "number" | "hidden" | "textarea";
  placeholder?: string;
  requiredSymbol?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
  error?: FieldError;
  name?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "width" | "height"> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Input(props: InputProps) {
  const {
    label,
    type = "text",
    placeholder,
    requiredSymbol,
    error,
    disabled,
    onChange,
    onBlur,
    ...rest
  } = props;

  return (
    <div className={cx("inputWrapper")}>
      <label className={cx("inputTitle")}>
        {label}
        {requiredSymbol && (
          <span className={cx("requiredSymbol")}>{requiredSymbol}</span>
        )}
      </label>
      {type === "textarea" ? (
        <>
          <textarea
            className={cx("inputContent", { error: !!error, disabled })}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
          />
          {error && <span className={cx("errorMessage")}>{error.message}</span>}
        </>
      ) : (
        <>
          <input
            type={type}
            className={cx("inputContent", { error: !!error, disabled })}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
          />
          {error && <span className={cx("errorMessage")}>{error.message}</span>}
        </>
      )}
    </div>
  );
}
