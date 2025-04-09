export default function Option(props) {
  const { title, subtitle, info, remaining, handleClick } = props;

  const btn =
    remaining > 0 ? (
      <button className="hover:cursor-pointer" onClick={handleClick}>
        Select Reward
      </button>
    ) : (
      <button>Out of Stock</button>
    );

  const colorVariant = {
    notSoldOut: {
      optionDiv: "p-4 md:p-8 rounded-lg border border-(--color-dark-gray)/30",
      btnDiv:
        "flex justify-center my-2 rounded-full w-35 h-10 p-2 bg-(--color-moderate-cyan) text-white text-sm hover:cursor-pointer hover:bg-(--color-dark-cyan)",
    },
    soldOut: {
      optionDiv:
        "p-4 rounded-lg border border-(--color-dark-gray)/40 opacity-40",
      btnDiv:
        "flex justify-center my-2 rounded-full w-35 h-10 p-2 bg-(--color-dark-gray) text-white text-sm",
    },
  };

  function getVariant() {
    if (remaining > 0 && subtitle != "") {
      return colorVariant.notSoldOut;
    } else if (remaining <= 0 && subtitle != "") {
      return colorVariant.soldOut;
    }
  }

  return (
    <div className="my-5">
      <div className={getVariant().optionDiv}>
        <div className="flex items-center">
          <div className="w-full md:flex md:justify-between">
            <h3 className="font-bold text-md">{title}</h3>
            <h4 className="mb-4 font-semibold text-sm text-(--color-moderate-cyan)">
              {subtitle}
            </h4>
          </div>
        </div>
        <p className="mb-4 text-sm text-(--color-dark-gray)">{info}</p>

        <div className="md:flex md:justify-between md:items-center">
          <div className="mb-4 md:mb-0 flex gap-2 items-center ">
            <div className="font-bold text-2xl md:h-full">{remaining}</div>
            <div className="text-(--color-dark-gray) text-md md:h-full">
              left
            </div>
          </div>
          <div className={getVariant().btnDiv}>{btn}</div>
        </div>
      </div>
    </div>
  );
}
