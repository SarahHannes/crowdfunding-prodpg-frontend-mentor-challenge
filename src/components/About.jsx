import Option from "./Option";
import Modal from "./Modal";
import Success from "./Success";

export default function About(props) {
  const {
    showModal,
    toggleShowModal,
    showSuccess,
    closeAll,
    handleSubmit,
    pledgeData,
  } = props;

  const optionsArray = [];

  for (let key in pledgeData) {
    if (pledgeData[key].showOnlyInModal === false) {
      const newOption = (
        <Option
          key={key}
          title={pledgeData[key].title}
          subtitle={pledgeData[key].subtitle}
          info={pledgeData[key].info}
          remaining={pledgeData[key].remaining}
          handleClick={toggleShowModal}
        />
      );
      optionsArray.push(newOption);
    }
  }

  return (
    <>
      <div className="bg-white p-8 pb-1 mt-6 rounded">
        <h2 className="font-bold text-md">About this project</h2>
        <p className="my-4 text-(--color-dark-gray) text-sm">
          The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform
          that elevates your screen to a more comfortable viewing height.
          Placing your monitor at eye level has the potential to improve your
          posture and make you more comfortable while at work, helping you stay
          focused on the task at hand.
        </p>
        <p className="my-4 text-(--color-dark-gray) text-sm">
          Featuring artisan craftsmanship, the simplicity of design creates
          extra desk space below your computer to allow notepads, pens, and USB
          sticks to be stored under the stand.
        </p>

        {optionsArray}
      </div>

      <form action={handleSubmit}>
        {showModal && (
          <Modal toggleShowModal={toggleShowModal} pledgeData={pledgeData} />
        )}
      </form>

      {showSuccess && <Success closeAll={closeAll} />}
    </>
  );
}
