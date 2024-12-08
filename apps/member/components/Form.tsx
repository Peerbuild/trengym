import { Controller, ControllerProps, FormProvider } from "react-hook-form";

export const Form = FormProvider;

export function FormField(props: ControllerProps): React.JSX.Element {
  return <Controller {...props} />;
}
