import { useState } from "react";

import data from "/data.json";
import mastercraftLogo from "/logo-mastercraft.svg";
import bookmarkIcon from "/icon-bookmark.svg";

import Header from "./components/Header";
import Summary from "./components/Summary";
import About from "./components/About";

function App() {
  const dataObj = {};
  data.forEach((element) => {
    const key = element.title.toLowerCase().replaceAll(" ", "");
    dataObj[key] = { ...element };
  });

  const [pledgeData, setPledgeData] = useState(dataObj);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [backed, setBacked] = useState({ backers: 5007, amount: 89914 });

  console.log("pledgeData", pledgeData);

  function toggleBookmark() {
    console.log("bookmarking");
    setBookmarked(!bookmarked);
  }

  function toggleShowModal() {
    console.log("button is clicked. showing modal selection");
    setShowSuccess(false);
    setShowModal(!showModal);
  }

  function confirmPledge(formData) {
    console.log("pledge is confirmed!");
    console.log("formData", formData);
    setShowSuccess(!showSuccess);
    setShowModal(false);
  }

  function closeAll() {
    console.log("got it! button in completed modal is clicked!");
    setShowSuccess(false);
    setShowModal(false);
  }

  function handleSubmit(formData) {
    const inputData = Object.fromEntries(formData);

    console.log("this is handlesubmit function");
    console.log("inputDAta", inputData);

    // Get pledge option id
    const confirmedPledge = inputData["pledge-option"];

    // Get pledge value from user input
    let confirmedVal = 0;
    if ("pledge-value" in inputData) {
      confirmedVal = Number(inputData["pledge-value"]);
    }

    console.log("confirmedVal", confirmedVal);

    // Update total money raised & backers
    setBacked((prevBacked) => {
      return {
        backers: prevBacked.backers + 1,
        amount: prevBacked.amount + confirmedVal,
      };
    });

    // Show confirmation modal
    confirmPledge();

    // Update selected pledge's stock
    setPledgeData((prevData) => {
      // dont update if it is pledgewithnoreward
      if (confirmedPledge === "pledgewithnoreward") {
        return prevData;
      } else {
        return {
          ...prevData,

          // update the selected pledge's remaining (decrement by 1)
          [confirmedPledge]: {
            ...prevData[confirmedPledge],
            remaining: prevData[confirmedPledge].remaining - 1,
          },
        };
      }
    });
  }

  return (
    <div className="bg-(--color-dark-gray)/15">
      <Header />

      <main className="min-h-screen relative mx-5 pb-10 md:w-180 md:mx-auto md:mt-50">
        <div className="mb-6 pb-6 rounded flex flex-col items-center text-center bg-white">
          <img
            className="-translate-y-1/2"
            src={mastercraftLogo}
            alt="Mastercraft logo"
          />
          <h1 className="text-2xl font-bold md:text-3xl">
            Mastercraft&nbsp;Bamboo Moniter&nbsp;Riser
          </h1>
          <p className="m-3 text-xs md:text-lg text-(--color-dark-gray)">
            A&nbsp;beautiful&nbsp;and&nbsp;handicrafted&nbsp;monitor&nbsp;stand&nbsp;to
            reduce&nbsp;neck&nbsp;and&nbsp;eye&nbsp;strain.
          </p>

          <div className="h-10 flex w-[78%] justify-between md:gap-0 md:w-full md:justify-between md:my-2">
            <button
              className="px-5 rounded-full bg-(--color-moderate-cyan) text-white text-sm font-semibold md:mx-8
              hover:cursor-pointer hover:bg-(--color-dark-cyan)
              "
              onClick={toggleShowModal}>
              Back this project
            </button>

            {bookmarked ? (
              <button
                onClick={toggleBookmark}
                className="md:mr-8 md:flex md:gap-2 md:rounded-full md:bg-(--color-dark-gray)/10
                hover:cursor-pointer 
                ">
                <img
                  className="h-10
                  filter-(--cyan-filter)"
                  src={bookmarkIcon}
                  alt="Bookmark icon"
                />
                <div className="pt-2.5 md:after:content-['Bookmarked'] md:text-sm md:visible rounded-e-full pr-3 font-bold text-(--color-dark-gray) md:text-(--color-dark-cyan) "></div>
              </button>
            ) : (
              <button
                onClick={toggleBookmark}
                className="md:mr-8 md:flex md:gap-2 md:rounded-full md:bg-(--color-dark-gray)/20
                hover:cursor-pointer 
                group
                ">
                <img
                  className="h-10
                group-hover:filter-(--gray-filter)
                "
                  src={bookmarkIcon}
                  alt="Bookmark icon"
                />
                <div className="pt-2.5 md:after:content-['Bookmark'] md:text-sm md:visible rounded-e-full pr-3 font-bold text-(--color-dark-gray)"></div>
              </button>
            )}
          </div>
        </div>

        <Summary backed={backed} />
        <About
          showModal={showModal}
          toggleShowModal={toggleShowModal}
          showSuccess={showSuccess}
          closeAll={closeAll}
          handleSubmit={handleSubmit}
          pledgeData={pledgeData}
        />
      </main>
    </div>
  );
}

export default App;
