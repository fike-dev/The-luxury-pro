import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import useSignup from "./useSignup";
import useUser from "./useUser";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    user: { email: userEmail },
    isLoading: isFetchingUser,
  } = useUser();
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const { isSigningUp, signUp } = useSignup();

  if (isFetchingUser) return <Spinner />;

  function onSubmit({ fullName, email, password }) {
    if (userEmail === "test@test.com") {
      toast.error(
        "You don't have permission to perform this operation as a demo user."
      );
      return;
    }
    signUp(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  function onError() {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password mismatched.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={reset}
          disabled={isSigningUp}
        >
          Cancel
        </Button>
        <Button disabled={isSigningUp}>
          {isSigningUp ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
