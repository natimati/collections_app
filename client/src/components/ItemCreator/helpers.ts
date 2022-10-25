import { FieldError, FieldErrorsImpl } from "react-hook-form";

export const getItemNameError = (errors: FieldErrorsImpl<{
  name: string;
}>) => {
  const error: FieldError | undefined = errors.name;
  switch (error?.type) {
    case 'required':
      return 'Please enter item name'
  }
};

export const getItemPropertyFieldError = (errors: FieldErrorsImpl<{
  name: string;
}>) => {
  const error: FieldError | undefined = errors.name;
  switch (error?.type) {
    case 'required':
      return 'Please enter additional field name'
  }
};
