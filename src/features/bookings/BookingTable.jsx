import { Link } from "react-router-dom";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Button from "../../ui/Button";

import BookingRow from "./BookingRow";
import useBookings from "./useBookings";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resourceName="Bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
      <div>
        <Button size="medium" as={Link} to="/bookings/new" replace={true}>
          New Booking
        </Button>
      </div>
    </Menus>
  );
}

export default BookingTable;
