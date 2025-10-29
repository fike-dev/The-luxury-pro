import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import SelectCabin from "../../ui/SelectCabin";
import Spinner from "../../ui/Spinner";

import { useForm } from "react-hook-form";
import useCreateGuest from "./useCreateGuest";
import useCountries from "./useCountries";

function CreateGuestForm({ setGuestId }) {
  const { isCreatingGuest, createGuest } = useCreateGuest();
  const { isLoading, countries } = useCountries();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (isLoading) return <Spinner />;

  function onSubmit(data) {
    const [nationality, countryFlag] = data.nationality.split("-");
    console.log(data);
    const newGuest = {
      ...data,
      nationality,
      countryFlag,
    };

    createGuest(
      { ...newGuest },
      {
        onSuccess: (data) => setGuestId(data.id),
        onSettled: () => reset(),
      }
    );
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
        <SelectCabin
          id="nationality"
          disabled={isLoading}
          {...register("nationality", {
            required: "This field is required",
            validate: (value) => value !== "" || "Please select valid country!",
          })}
        >
          <option value="">Select country... </option>
          {countries.map((country) => (
            <option
              value={`${country.name}-${country.flag}`}
              key={country.name}
            >
              {country.name}
            </option>
          ))}
        </SelectCabin>
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
