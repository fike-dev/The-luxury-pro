import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function Logout() {
  const { isLogingOut, logout } = useLogout();

  return (
    <Modal>
      <Modal.Open opens="logout">
        <ButtonIcon title="logout">
          {isLogingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
      </Modal.Open>
      <Modal.Window name="logout">
        <ConfirmDelete
          resourceName={"Logout"}
          disabled={isLogingOut}
          onConfirm={logout}
          type="logout"
        />
      </Modal.Window>
    </Modal>
  );
}

export default Logout;
