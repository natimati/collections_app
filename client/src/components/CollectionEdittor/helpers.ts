import { FieldError, FieldErrorsImpl } from "react-hook-form";

export const getCollectionNameError = (errors: FieldErrorsImpl<{
  name: string;
}>) => {
  const error: FieldError | undefined = errors.name;
  switch (error?.type) {
    case 'required':
      return 'Please enter collection name'
  }
};

export const getCollectionTopicError = (errors: FieldErrorsImpl<{
  topic: string;
}>) => {
  const error: FieldError | undefined = errors.topic;
  switch (error?.type) {
    case 'required':
      return 'Please choose collection topic'
  }
};

export const getAdditionalFieldNameError = (errors: FieldErrorsImpl<{
  name: string;
}>) => {
  const error: FieldError | undefined = errors.name;
  switch (error?.type) {
    case 'required':
      return 'Please enter additional field name'
  }
};

