import Card from "./Card";

export default function Summary(props) {
  const {
    backed: { amount, backers },
  } = props;
  console.log("props in summary", props);

  const divider = (
    <div className="self-center w-[20%] border-(--color-dark-gray) border-t-1 md:border-t-0 md:border-r-1 md:h-11 md:w-0"></div>
  );

  const updatedValStr = amount.toLocaleString().split(",")[0] + "%";
  console.log("updatedVal", updatedValStr, typeof updatedValStr);

  // Updating the progress bar using inline styles
  const styles = {
    width: updatedValStr,
  };

  return (
    <div className="rounded bg-white">
      <div className="rounded flex flex-col md:flex-row justify-center md:justify-evenly md:py-5">
        <Card
          title={`$${amount.toLocaleString()}`}
          subtitle="of $100,000 backed"
        />
        {divider}
        <Card title={backers.toLocaleString()} subtitle="total backers" />
        {divider}
        <Card title="56" subtitle="days left" />
      </div>

      {/* progress bar */}
      <div className="pb-5 md:pb-6 mx-8 ">
        <div className="bg-neutral-200 rounded-full h-2">
          <div
            style={styles}
            className="bg-(--color-moderate-cyan) rounded-full w-[89%] h-2"></div>
        </div>
      </div>
    </div>
  );
}
