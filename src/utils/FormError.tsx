import clsx from "clsx";
import type { FieldErrors } from "react-hook-form";

type ErrorType = {
  errors: FieldErrors;
  name: string;
  classname?: string;
};

const FormError = ({ errors, name, classname }: ErrorType) => {
  return (
    <p className={clsx("text-rose-700 text-sm w-full text-left", classname)}>
      {errors && errors[name]?.message ? String(errors[name]?.message) : null}
    </p>
  );
};

export default FormError;
