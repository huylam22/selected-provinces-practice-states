import React, { useEffect, useRef, useState } from "react";
import "./DropDown.css";
import { provinces } from "./provinces";

const DropDown = () => {
  const [isDropDown, setIsDropDown] = useState(false);

  const [selectedProvince, setSelectedProvince] = useState<
    Record<string, boolean>
  >(
    provinces.reduce(
      (obj, province) => ({ ...obj, [province.city]: false }),
      {}
    )
  );
  //   console.log(selectedProvince);

  const numberOfProvinceSelected =
    Object.values(selectedProvince).filter(Boolean).length;

  const handleClickDropDown = (e: any) => {
    e.stopPropagation();
    setIsDropDown((prevState) => !prevState);
  };
  // console.log(selectedProvince);

  const dropDownRef = useRef(null);
  useEffect(() => {
    const onClick = (e: any) => {
      if (e.target !== dropDownRef.current) {
        setIsDropDown(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.addEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="state-dropdown">
      <button onClick={handleClickDropDown}>
        {numberOfProvinceSelected > 0
          ? `${numberOfProvinceSelected} provinces selected`
          : " -- select your provinces --"}
        {isDropDown ? (
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

      {isDropDown && (
        <div onClick={(e) => e.stopPropagation()} className="panel">
          {provinces.map((province, index) => (
            <fieldset
              key={index}
              className={selectedProvince[province.city] ? `selected` : ""}
            >
              <input
                id={`input ${index}`}
                type="checkbox"
                onChange={(e) =>
                  setSelectedProvince({
                    ...selectedProvince,
                    [province.city]: e.target.checked,
                  })
                }
                checked={selectedProvince[province.city]}
              />
              <label htmlFor={`input ${index}`}> {province.city}</label>
            </fieldset>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
