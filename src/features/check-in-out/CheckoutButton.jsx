import toast from "react-hot-toast";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import useUser from "../authentication/useUser";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckout();
  const {
    user: { email },
    isLoading,
  } = useUser();
  if (isLoading) return <Spinner />;

  function handleCheckOut(bookingId) {
    if (email === "test@test.com") {
      toast.error(
        "You don't have permission to perform this operation as a demo user."
      );
      return;
    }
    checkOut(bookingId);
  }

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => handleCheckOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
