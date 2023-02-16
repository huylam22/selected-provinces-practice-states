import React, { useReducer } from "react";
import { provinces } from "./provinces";

const selectedProvince = provinces.reduce(
  (obj, province) => ({ ...obj, [province.city]: false }),
  {}
);
console.log(selectedProvince);
const initialState = {
  provinces: selectedProvince,
  isDropdown: false,
};

const setCheckBox = (payload) => {
  return {
    type: "CHECK",
    payload,
  };
};

const dropdownReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "CLICK": {
      const isDropdown = state.isDropdown;
      const nextState = JSON.parse(JSON.stringify(state)); // clone lai state
      nextState.isDropdown = !isDropdown; // Same Logic
      return nextState;
    }

    case "CHECK": {
      const label = action.payload;
      // console.log(label);
      const provinces = {
        ...state.provinces,
        [label]: !state.provinces[label],
      };
      // console.log(provinces);
      // console.log(state.provinces);

      return { ...state, provinces };
    }

    default:
      throw new Error("Invalid action");
  }
  // return state;
};

// Test
// const numberOfProvinceSelected =
//   Object.values(selectedProvince).filter(Boolean).length;
// console.log(numberOfProvinceSelected);

const DropDownWithReducer = () => {
  const [state, dispatch] = useReducer(dropdownReducer, initialState);

  const numberOfProvinceSelected = Object.values(state.provinces).filter(
    (value) => value
  ).length;
  const handleClickDropDown = (e) => {
    e.stopPropagation();
    dispatch({ type: "CLICK" });
  };

  const handleClickCheckBox = (city) => {
    // city.stopPropagation();
    // console.log(city);
    dispatch(setCheckBox(city));
  };
  return (
    <div className="state-dropdown">
      <button onClick={handleClickDropDown}>
        {numberOfProvinceSelected > 0
          ? `${numberOfProvinceSelected} provinces selected`
          : " -- select your provinces --"}
        {state.isDropdown ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        )}
      </button>
      {state.isDropdown && (
        <div onClick={(e) => e.stopPropagation()} className="panel">
          {provinces.map((province, index) => (
            <fieldset
              className={state.provinces[province.city] ? `selected` : ""}
              key={index}
            >
              <input
                id={`input ${index}`}
                type="checkbox"
                onChange={() => handleClickCheckBox(province.city)}
                checked={state.provinces[province.city]}
              />
              <label htmlFor={`input ${index}`}> {province.city}</label>
            </fieldset>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownWithReducer;
