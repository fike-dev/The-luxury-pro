import CreateGuestForm from "../features/bookings/CreateGuestForm";
import CreateBookingForm from "../features/bookings/CreateBookingForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import useSettings from "../features/settings/useSettings";
import { useCabins } from "../features/cabins/useCabins";
import Spinner from "../ui/Spinner";
import { useState } from "react";

function NewBooking() {
  const [guestId, setGuestId] = useState(0);

  const { isLoading: isLoadingSettings, settings } = useSettings();
  const { isLoading: isLoadingCabins, cabins } = useCabins();

  if (isLoadingSettings || isLoadingCabins) return <Spinner />;

  return (
    <>
      <Heading as="h1">Create new reservation</Heading>

      <Row>
        <Heading as="h3">Create guest</Heading>
        <CreateGuestForm setGuestId={setGuestId} />
      </Row>

      <Row>
        {guestId !== 0 ? (
          <>
            <Heading as="h3">create booking</Heading>
            <CreateBookingForm
              settings={settings}
              cabins={cabins}
              guestId={guestId}
              setGuestId={setGuestId}
            />
          </>
        ) : (
          <p>Start by creating new guest</p>
        )}
      </Row>
    </>
  );
}

export default NewBooking;
