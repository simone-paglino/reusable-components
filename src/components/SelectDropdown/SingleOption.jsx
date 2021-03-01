import React, { memo } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";

const hoverClass = {
  cursor: "pointer",
  backgroundColor: "#292929",
  color: "#fff",
  transition: ".3s",
};

const useStyles = makeStyles((theme) => ({
  baseStyle: {
    padding: "1rem 2rem",
    borderBottom: "2px solid #292929",
    listStyle: "none",
    fontSize: ({ fontSizeRem }) => `${fontSizeRem}rem`,
  },
  selectableSingleOption: {
    backgroundColor: "gray",
    "&:hover": hoverClass,
  },
  selectedClass: hoverClass,
}));

const SingleOption = memo(
  ({
    index = 0,
    optionName = "Default option",
    dataElement = undefined,
    isThisSelected = false,
    fontSizeRem = 1.2,
    selectDropdownOption = () => {},
    tabIndex = 0,
  }) => {
    const classes = useStyles({ fontSizeRem });

    // Event Key handlers
    const eventKeyHandlers = (event) => {
      if (event.keyCode === 13) {
        selectDropdownOption(index, dataElement);
      }
    };

    return (
      <li
        tabIndex={tabIndex}
        onKeyDown={eventKeyHandlers}
        className={`${classes.baseStyle} ${
          isThisSelected
            ? classes.selectedClass
            : classes.selectableSingleOption
        }`}
        onClick={() => selectDropdownOption(index, dataElement)}
      >
        {optionName}
      </li>
    );
  }
);

export default SingleOption;
