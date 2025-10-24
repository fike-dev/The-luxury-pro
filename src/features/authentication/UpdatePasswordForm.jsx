import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

import useUpdatePassword from "./useUpdatePassword";
import useUser from "./useUser";

function UpdatePasswordForm() {
  const {
    user: { email },
  } = useUser();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updatePassword, isUpdating } = useUpdatePassword();

  function onSubmit({ newPassword, currentPassword }) {
    updatePassword(
      { newPassword, currentPassword, email },
      { onSuccess: () => reset() }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current Password"
        error={errors?.currentPassword?.message}
      >
        <Input
          type="password"
          id="currentPassword"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("currentPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="New Password (min 8 chars)"
        error={errors?.newPassword?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("newPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="confirm-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().newPassword === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : "Update password"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
