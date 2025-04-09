export default function OptionModal(props) {
  const {
    id,
    title,
    subtitle,
    info,
    remaining,
    showRemaining,
    selected,
    handleSelected,
  } = props;

  const minPledgeValue = Number(subtitle.match(/\d+/));

  // show correct border color when option is selected (depends on whether there is pledge option or not)
  const colorVariant = {
    hasRewardNotSoldOut: {
      highlight:
        "main-grid p-4 rounded-t-lg border-2 border-(--color-moderate-cyan) border-b-0",
      notHighlight:
        "main-grid p-4 rounded-lg border border-(--color-dark-gray)/30",
    },
    hasRewardSoldOut: {
      highlight:
        "main-grid p-4 rounded-lg border-2 border-(--color-moderate-cyan) opacity-40",
      notHighlight:
        "main-grid p-4 rounded-lg border border-(--color-dark-gray)/40 opacity-40",
    },

    noReward: {
      highlight:
        "main-grid p-4 rounded-lg border-2 border-(--color-moderate-cyan)",
      notHighlight:
        "main-grid p-4 rounded-lg border border-(--color-dark-gray)/40",
    },
  };

  // dont show hover active state when sold out
  const colorVariantHover = {
    soldOut: {
      div1: "title-subgrid flex items-center",
      label:
        "flex border border-(--color-dark-gray) rounded-full h-6 w-6 justify-center items-center",
    },
    notSoldOut: {
      div1: "title-subgrid flex items-center hover:text-(--color-dark-cyan) hover:cursor-pointer group",
      label:
        "hover:cursor-pointer group-hover:border-(--color-dark-cyan) group-hover:border-2 flex border border-(--color-dark-gray) rounded-full h-6 w-6 justify-center items-center",
    },
  };

  function getVariantHover() {
    if (remaining > 0) {
      return colorVariantHover.notSoldOut;
    }
    return colorVariantHover.soldOut;
  }
  const hasPledgeInput = remaining > 0 && subtitle != "" ? true : false;

  function getVariant() {
    if (selected === id) {
      if (remaining > 0 && subtitle != "") {
        return colorVariant.hasRewardNotSoldOut.highlight;
      } else if (remaining <= 0 && subtitle != "") {
        return colorVariant.hasRewardSoldOut.highlight;
      } else {
        return colorVariant.noReward.highlight;
      }
    } else {
      if (remaining > 0 && subtitle != "") {
        return colorVariant.hasRewardNotSoldOut.notHighlight;
      } else if (remaining <= 0 && subtitle != "") {
        return colorVariant.hasRewardSoldOut.notHighlight;
      } else {
        return colorVariant.noReward.notHighlight;
      }
    }
  }

  return (
    <div className="my-5">
      <div className={getVariant()}>
        <div
          id={`${id}-div1`}
          className={getVariantHover().div1}
          onClick={handleSelected}>
          {/* radio button */}
          <div id={`${id}-div2`} className="p-3">
            <label id={`${id}-label`} className={getVariantHover().label}>
              <input
                className="w-0 h-0 hidden peer"
                onChange={handleSelected}
                checked={selected === id ? true : false}
                type="radio"
                name="pledge-option"
                value={id}
                id={id}
                disabled={remaining > 0 ? false : true}
              />
              <div
                id={`${id}-div4`}
                className="h-3 w-3 peer-checked:bg-(--color-dark-cyan) rounded-full"></div>
            </label>
          </div>

          {/* show subtitle only when substitle !== ""; otherwise only show title */}
          {subtitle !== "" ? (
            <div id={`${id}-div5`} className="md:flex md:gap-4 md:items-center">
              <h3 id={`${id}-title`} className="font-bold text-md">
                {title}
              </h3>
              <h4
                id={`${id}-subtitle`}
                className="md:mb-0
                mb-4 font-semibold text-sm text-(--color-moderate-cyan)">
                {subtitle}
              </h4>
            </div>
          ) : (
            <h3
              id={`${id}-title`}
              className="title-subgrid
            font-bold text-md">
              {title}
            </h3>
          )}
        </div>
        {/* info */}
        <p
          className="p-4 mb-4 text-sm text-(--color-dark-gray)
        info-subgrid">
          {info}
        </p>
        <div className="left-subgrid p-4">
          {/* show only when showRemaining == true */}
          {showRemaining ? (
            <div className="mb-4 md:mb-0 flex gap-2 items-center">
              <div className="font-bold text-2xl md:h-full md:w-full">
                {remaining}
              </div>
              <div className="text-(--color-dark-gray) text-2xl md:h-full">
                left
              </div>
            </div>
          ) : null}
        </div>

        {/* show continue button only if option has no pledge and it is selected */}
        {selected === id && !hasPledgeInput ? (
          <div className="norewardbtn-subgrid flex justify-center md:justify-end w-full h-12">
            <button
              type="submit"
              className="
              rounded-full bg-(--color-moderate-cyan) text-white py-1 px-5
              hover:bg-(--color-dark-cyan) hover:cursor-pointer
              ">
              Continue
            </button>
          </div>
        ) : null}
      </div>

      {/* show pledge input only if current option is selected */}
      {selected === id && hasPledgeInput ? (
        <div
          className="flex flex-col gap-3 items-center rounded-b-lg 
            border-2 border-(--color-moderate-cyan)
            // 2 different border color
            border-t-1 border-t-(--color-dark-gray)/30 pb-4
            md:flex-row md:justify-between md:px-11 md:items-center md:pt-4
          ">
          <p
            className="mt-5 text-(--color-dark-gray)
          md:m-0
          ">
            Enter your pledge
          </p>
          <div className="flex gap-4">
            <div
              className="flex items-center p-1 rounded-full border border-(--color-dark-gray)/30
            hover:cursor-pointer hover:border-(--color-moderate-cyan)
            ">
              <div
                className="text-(--color-dark-gray) ml-3
              hover:cursor-pointer
              ">
                $
              </div>
              <input
                className="mx-2 py-2 font-bold caret-(--color-moderate-cyan)
                focus:outline-none hover:cursor-pointer"
                type="number"
                name="pledge-value"
                id={`${id}-pledge-value`}
                min={minPledgeValue}
                max="1000"
                required
              />
            </div>
            <button
              className="
              rounded-full bg-(--color-moderate-cyan) text-white py-1 px-5
              hover:bg-(--color-dark-cyan) hover:cursor-pointer"
              type="submit">
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
