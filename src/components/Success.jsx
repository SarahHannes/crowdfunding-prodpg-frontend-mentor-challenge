import checkIcon from "/icon-check.svg";

export default function Success({ closeAll }) {
  return (
    <div className="md:flex md:justify-center">
      {/* overlay */}
      <div className="w-screen h-screen top-0 bottom-0 right-0 left-0 fixed bg-stone-800/50"></div>
      {/* the dialogue */}
      <div
        className="rounded-xl flex flex-col items-center bg-white w-full p-6 absolute top-0
      md:w-lg md:top-35
      ">
        <img className="size-fit p-2" src={checkIcon} alt="Success" />
        <h1 className="font-bold text-xl p-4">Thanks for your support!</h1>
        <p className="text-center p-2 text-(--color-dark-gray)">
          Your pledge brings us one step closer to sharing Mastercraft Bamboo
          Monitor Riser worldwide. You will get an email once our campaign is
          completed.
        </p>
        <button
          onClick={closeAll}
          className="
          m-3 py-3 px-6 rounded-full bg-(--color-moderate-cyan) text-white font-semibold
          hover:bg-(--color-dark-cyan) hover:cursor-pointer
          ">
          Got it!
        </button>
      </div>
    </div>
  );
}
