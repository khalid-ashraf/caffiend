import { useState } from "react";
import { useDispatch } from "react-redux";

import { useAuth } from "../state/store";
import { setGlobalData } from "../state/authSlice";
import { handleOpenModal } from "../state/modalSlice";

import { coffeeOptions } from "../utils";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CoffeeForm = () => {
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
  const [coffeeCost, setCoffeeCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  const { globalUser, globalData } = useAuth();

  const dispatch = useDispatch();

  const handleSubmitForm = async () => {
    if (!globalUser) {
      dispatch(handleOpenModal());
      return;
    }

    // define a guard clause that only submits the form once it is completed.
    if (!selectedCoffee) {
      alert("Please select coffee");
      return;
    }
    try {
      const newGlobalData = {
        ...(globalData || {}),
      };

      const nowTime = Date.now();
      const timeToSubtract = hour * 60 * 60 * 1000 + min * 60 * 100;

      const timeStamp = nowTime - timeToSubtract;

      const newData = {
        name: selectedCoffee,
        cost: coffeeCost,
      };

      newGlobalData[timeStamp] = newData;
      console.log(newGlobalData);

      // update the global state.
      dispatch(setGlobalData(newGlobalData));

      // persist the data in firestore
      const userRef = doc(db, "users", globalUser.uid);
      const res = await setDoc(
        userRef,
        {
          [timeStamp]: newData,
        },
        { merge: true }
      );

      console.log(selectedCoffee, coffeeCost, timeStamp);

      // Reseting form values
      setSelectedCoffee(null);
      setCoffeeCost(0);
      setHour(0);
      setMin(0);
    } catch (error) {
      console.log(error.message);
    }
    // then create a new data object
  };

  return (
    <>
      <div className='section-header'>
        <i className='fa-solid fa-pencil' />
        <h2>Start Tracking Today</h2>
      </div>

      {/* CoffeeType Component is defined below */}
      <CoffeeType
        coffeeOptions={coffeeOptions}
        showCoffeeTypes={showCoffeeTypes}
        setShowCoffeeTypes={setShowCoffeeTypes}
        selectedCoffee={selectedCoffee}
        setSelectedCoffee={setSelectedCoffee}
      />

      <h4>Add the cost ($)</h4>
      <input
        value={coffeeCost === 0 ? "" : coffeeCost}
        onChange={(e) => setCoffeeCost(e.target.valueAsNumber)}
        className='w-full'
        type='number'
        placeholder='4.50'
      />

      {/* TimeEntry Component is defined below */}
      <TimeEntry
        setHour={setHour}
        setMin={setMin}
      />

      <button onClick={handleSubmitForm}>
        <p>Add the Entry</p>
      </button>
    </>
  );
};
export default CoffeeForm;

// Secondary component - displays the select coffee grid and other dropdown
const CoffeeType = ({
  coffeeOptions,
  showCoffeeTypes,
  setShowCoffeeTypes,
  selectedCoffee,
  setSelectedCoffee,
}) => {
  return (
    <>
      <h4>Select coffee type</h4>
      <div className='coffee-grid'>
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
          return (
            <button
              onClick={() => {
                setShowCoffeeTypes(false);
                setSelectedCoffee(option.name);
              }}
              className={
                "button-card " +
                (option.name === selectedCoffee && "coffee-button-selected")
              }
              key={optionIndex}
            >
              <h4>{option.name}</h4>
              <p>{option.caffeine}</p>
            </button>
          );
        })}

        <button
          onClick={() => setShowCoffeeTypes(true)}
          className={
            "button-card " + (showCoffeeTypes && "coffee-button-selected")
          }
        >
          <h4>Other</h4>
          <p>N/A</p>
        </button>
      </div>

      {showCoffeeTypes && (
        <select
          onChange={(e) => setSelectedCoffee(e.target.value)}
          name='coffee-list'
          id='coffee-list'
        >
          <option value={null}>Select Type</option>
          {coffeeOptions.map((option, optionIndex) => {
            return (
              <option
                value={option.name}
                key={optionIndex}
              >
                {option.name} ({option.caffeine} mg)
              </option>
            );
          })}
        </select>
      )}
    </>
  );
};

// Secondary component which takes the input of time and hour since coffee consumption
const TimeEntry = ({ setHour, setMin }) => {
  return (
    <>
      <h4>Time since consumption</h4>
      <div className='time-entry'>
        <div>
          <h6>Hours</h6>
          <select
            onChange={(e) => setHour(e.target.value)}
            name='hours-select'
            id='hours-select'
          >
            {Array.from({ length: 24 }, (_, i) => i).map((hour, hourIndex) => {
              return (
                <option
                  key={hourIndex}
                  value={hour}
                >
                  {hour}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <h6>Minutes</h6>
          <select
            onChange={(e) => setMin(e.target.value)}
            name='minutes-select'
            id='minutes-select'
          >
            {[0, 5, 10, 15, 30, 45].map((minute, minIndex) => {
              return (
                <option
                  key={minIndex}
                  value={minute}
                >
                  {minute}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};
