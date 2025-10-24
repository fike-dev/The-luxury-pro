import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. number of bookings and stays
  const numBooking = bookings?.length;

  // 2, sales
  const sales = bookings?.reduce(
    (acc, cur) => (cur.isPaid ? acc + cur.totalPrice : acc),
    0
  );

  // 3. checkins
  const checkins = confirmedStays?.length;

  // 4. Occupancy rate
  const occupation = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  const occupancyRate = `${Math.round(
    (occupation / (numDays * cabinCount)) * 100
  )}%`;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBooking}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancyRate}
      />
    </>
  );
}

export default Stats;
