import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";

import { useForm } from "react-hook-form";
import { getFlagUrl } from "../../utils/helpers";
import useCreateGuest from "./useCreateGuest";

function CreateGuestForm({ setGuestId }) {
  const { isCreatingGuest, createGuest } = useCreateGuest();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const newGuest = {
      ...data,
      countryFlag: getFlagUrl(data.nationality),
    };

    createGuest(
      { ...newGuest },
      {
        onSuccess: (data) => setGuestId(data.id),
        onSettled: () => reset(),
      }
    );

    // console.log(newGuest);
  }
  function onError() {}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Guest name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreatingGuest}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreatingGuest}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isCreatingGuest}
          {...register("nationality", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="NationalID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalId"
          disabled={isCreatingGuest}
          {...register("nationalID", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button>{isCreatingGuest ? <SpinnerMini /> : "Add guest"}</Button>
      </FormRow>
    </Form>
  );
}
export default CreateGuestForm;
