import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import toast from "react-hot-toast";
import useUser from "../authentication/useUser";
import Spinner from "../../ui/Spinner";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    user: { email },
    isLoading,
  } = useUser();
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  // const isWorking = isDeleting || isCreating;

  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  if (isLoading) return <Spinner />;

  function handleCabin(cabinId = "", key = "duplicate") {
    if (email === "test@test.com") {
      toast.error(
        "You don't have permission to perform this operation as a demo user."
      );
      return;
    }
    if (key === "delete") {
      deleteCabin(cabinId);
      return;
    }
    const cabinToDuplicate = {
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    };
    createCabin({ ...cabinToDuplicate });
  }

  return (
    <Table.Row>
      <Img src={image} alt="img" />
      <Cabin>{name} </Cabin>
      <div>Fits up to {maxCapacity} guests. </div>
      <Price>{formatCurrency(regularPrice)} </Price>
      {discount ? (
        <Discount>{formatCurrency(discount)} </Discount>
      ) : (
        <span>&mdash; </span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinID} />

            <Menus.List id={cabinID}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={() => handleCabin()}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit-form">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="Cabin"
              onConfirm={() => handleCabin(cabinID, "delete")}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
