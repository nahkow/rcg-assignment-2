import React, { useEffect, useReducer, useRef } from "react";

type SimpleInputProps = {
  errorMessage?: string;
  id: string;
  initialValue?: string;
  label: string;
  validation: (value: string) => boolean;
};

const valueReducer = (
  state: any,
  action:
    | { type: "UPDATE_VALUE"; payload: string }
    | { type: "TOUCH" }
    | { type: "UPDATE_VALIDITY"; payload: boolean }
) => {
  switch (action.type) {
    case "UPDATE_VALUE":
      return {
        ...state,
        value: action.payload,
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    case "UPDATE_VALIDITY":
      return {
        ...state,
        isValid: action.payload,
      };
    default:
      throw new Error("Invalid action type");
  }
};

const useSimpleInput = ({
  id,
  label,
  validation,
  initialValue = "",
  errorMessage = "Invalid input",
}: SimpleInputProps) => {
  const htmlElRef = useRef<HTMLInputElement>(null)
  const [inputState, dispatch] = useReducer(valueReducer, {
    value: initialValue,
    isValid: false,
    isTouched: false,
  });

  const focus = () => htmlElRef.current?.focus();
  const clear = () => dispatch({ type: "UPDATE_VALUE", payload: "" });

  useEffect(() => {
    dispatch({
      type: "UPDATE_VALIDITY",
      payload: validation(inputState.value),
    });
  }, [inputState.value]);

  const FC = (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input
        ref={htmlElRef}
        type="text"
        id={id}
        value={inputState.value}
        onChange={(e) =>
          dispatch({ type: "UPDATE_VALUE", payload: e.target.value })
        }
        onBlur={() => dispatch({ type: "TOUCH" })}
      />
      {inputState.isTouched && !inputState.isValid ? (
        <p className="error-text">{errorMessage}</p>
      ) : null}
    </div>
  );

  return {
    FC,
    isValid: inputState.isValid,
    value: inputState.value,
    clear,
    focus
  };
};

export default useSimpleInput;
