import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import TextArea from "../../ui/Textarea";
import SpinnerMini from "../../ui/SpinnerMini";
import SelectCabin from "../../ui/SelectCabin";
import BookingCheckbox from "../../ui/BookingCheckbox";

import { subtractDates } from "../../utils/helpers";

import useCreateBooking from "./useCreateBookings";
import useUser from "../authentication/useUser";
import Spinner from "../../ui/Spinner";

function CreateBookingForm({ settings, cabins, guestId, setGuestId }) {
  const {
    user: { email },
    isLoading,
  } = useUser();
  const { isCreatingBooking, createBooking } = useCreateBooking();
  const navigate = useNavigate();

  const {
    maxBookingLength,
    minBookingLength,
    breakfastPrice,
    maxGuestsPerBooking,
  } = settings;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const cabinsBooking = cabins.map((cabin) => {
    return { id: cabin.id, cabinPrice: cabin.regularPrice - cabin.discount };
  });

  if (isLoading) return <Spinner />;

  function onSuccess(data) {
    if (email === "test@test.com") {
      toast.error(
        "You don't have permission to perform this operation as a demo user."
      );
      return;
    }
    if (guestId === 0) {
      toast.error("You have to add new guest first!");
      return;
    }

    const hasBreakfast = watch("hasBreakfast");
    const cabinId = Number(watch("cabinId"));

    const finalCabinPrice = cabinsBooking.filter(
      (cabin) => cabin.id === cabinId
    )[0].cabinPrice;

    const numNights = subtractDates(data.endDate, data.startDate);

    const newBooking = {
      ...data,
      numNights,
      numGuests: Number(data.numGuests),
      extrasPrice: hasBreakfast ? breakfastPrice * Number(data.numGuests) : 0.0,
      totalPrice: hasBreakfast
        ? (breakfastPrice * Number(data.numGuests) + finalCabinPrice) *
          numNights
        : finalCabinPrice * numNights,
      guestId,
      cabinPrice: finalCabinPrice,
      cabinId,
    };

    createBooking(
      { ...newBooking },
      {
        onSuccess: (data) => {
          setGuestId(0);
          navigate(`/bookings/${data.id}`);
        },
        onSettled: () => reset(),
      }
    );
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSuccess, onError)}>
      <FormRow label="Cabin ID" error={errors?.startDate?.message}>
        <SelectCabin
          id="canbin-id"
          {...register("cabinId", {
            required: "This field is required",
          })}
        >
          {cabinsBooking.map((cabin) => {
            return (
              <option value={cabin.id} key={cabin.id}>
                {cabin.id}{" "}
              </option>
            );
          })}
        </SelectCabin>
      </FormRow>
      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="start-date"
          {...register("startDate", {
            required: "This field is required",
            // validate: (value) =>
          })}
        />
      </FormRow>
      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="end-date"
          {...register("endDate", {
            required: "This field is required",
            validate: (value) => {
              const nights = +subtractDates(value, getValues()?.startDate);
              return (
                (nights >= minBookingLength && nights <= maxBookingLength) ||
                `The number of nights to stay have to be between ${minBookingLength} and ${maxBookingLength}`
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "There must be at least 1 guest",
            },
            max: {
              value: maxGuestsPerBooking,
              message: `Guests must not be more than ${maxGuestsPerBooking}`,
            },
          })}
        />
      </FormRow>

      <FormRow label="Has breakfast" error={errors?.hasBreakfast?.message}>
        <BookingCheckbox>
          <input
            type="checkbox"
            id="hasBreakfast"
            {...register("hasBreakfast")}
          />
        </BookingCheckbox>
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <SelectCabin
          id="status"
          {...register("status", {
            required: "This field is required",
          })}
        >
          <option value="unconfirmed">unconfirmed</option>
          <option value="checked-in">checked-in</option>
          <option value="checked-out">checked-out</option>
        </SelectCabin>
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <TextArea id="observations" {...register("observations")} />
      </FormRow>

      <FormRow label="Is paid" error={errors?.isPaid?.message}>
        <BookingCheckbox>
          <input type="checkbox" id="isPaid" {...register("isPaid")} />
        </BookingCheckbox>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button>{isCreatingBooking ? <SpinnerMini /> : "Add booking"}</Button>
      </FormRow>
    </Form>
  );
}
export default CreateBookingForm;
