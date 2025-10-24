import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUpdateSettings from "./useUpdateSettings";
import Button from "../../ui/Button";
// import { updateSetting } from "../../services/apiSettings";

function UpdateSettingsForm({ settings }) {
  const { isUpdating, updateSettings } = useUpdateSettings();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { ...settings },
  });

  function onSubmit(data) {
    console.log(data);
    updateSettings({ ...data });
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Minimum nights/booking"
        error={errors?.minBookingLength?.message}
      >
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          {...register("minBookingLength", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum guests can't be less than 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          {...register("maxBookingLength", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Maximum nights can't be less than 1",
            },
            validate: (value) =>
              value >= getValues().minNights ||
              "Maximum nights can't be more than minimum nights per booking",
          })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          {...register("maxGuestsPerBooking", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Maximum guests can't be less than 1",
            },
            max: {
              value: 100,
              message: "Maximum gusts can't be more than 100",
            },
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          {...register("breakfastPrice", {
            required: "This field is required!",
            min: {
              value: 0,
              message: "Brekfast price can't be less than 0",
            },
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button id="btn" disabled={isUpdating}>
          Update settigs
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
