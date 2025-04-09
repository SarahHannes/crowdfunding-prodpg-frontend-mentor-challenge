import { useState } from "react";

import OptionModal from "./OptionModal";

import closeModal from "/icon-close-modal.svg";

export default function Modal(props) {
  const { toggleShowModal, pledgeData } = props;
  console.log("props in modal", props);

  const [selected, setSelected] = useState(null);

  function handleSelected(event) {
    setSelected((prevSelection) => {
      const targetId = event.target.id;
      console.log("targetId after split", targetId.split("-"));
      const curSelectionId = targetId.split("-")[0];

      console.log("curSelectionId in pledgeData", curSelectionId in pledgeData);
      if (
        curSelectionId in pledgeData &&
        pledgeData[curSelectionId].remaining > 0
      ) {
        return curSelectionId;
      }
      return prevSelection;
    });
  }

  const modalOptionsArray = [];
  for (let key in pledgeData) {
    const newOptionModal = (
      <OptionModal
        key={key}
        id={key}
        {...pledgeData[key]}
        selected={selected}
        handleSelected={handleSelected}
      />
    );

    modalOptionsArray.push(newOptionModal);
  }

  return (
    <div className="">
      {/* overlay */}
      <div className="w-screen h-screen top-0 bottom-0 right-0 left-0 fixed bg-stone-800/50"></div>

      {/* the dialogue */}
      <div
        className="bg-white p-8 pb-1 mt-6 rounded
      size-fit w-full bg-white absolute top-15
      ">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">Back this project</h2>
          <button
            className="self-center hover:cursor-pointer"
            onClick={toggleShowModal}>
            <img
              className="hover:saturate-50"
              src={closeModal}
              alt="Close Modal"
            />
          </button>
        </div>
        <p className="my-4 text-(--color-dark-gray) text-sm">
          Want to support us in bringing Mastercraft Bamboo Monitor Riser out in
          the world?
        </p>
        {modalOptionsArray}
      </div>
    </div>
  );
}
