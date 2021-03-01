import React, { useState, useEffect, memo, useMemo, useCallback } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// Components
import SingleOption from "./SingleOption";
// SVG
import { ReactComponent as ArrowDown } from "./arrow_down.svg";

// if the fontSizeValueRem is a number type value, the function returns it
// if the fontSizeValueRem is a string type value, the function check is the format is a number format
const getFontSizeValue = (fontSizeValueRem) => {
  return typeof fontSizeValueRem === "number"
    ? fontSizeValueRem
    : typeof fontSizeValueRem === "string" &&
      /^[\d]+.?[\d]*/.test(fontSizeValueRem)
    ? parseFloat(fontSizeValueRem)
    : 1.2;
};

// Constant object for transition cross-browsing compatibility
const transitionObject = {
  transition: ".3s",
  WebkitTransition: ".3s",
  MozTransition: ".3s",
  OTransition: ".3s",
};

// Define style classes
const useStyles = makeStyles((theme) => ({
  selectDropdown: ({ fontSizeValueRem, numMaxLengthChars }) => ({
    margin: "auto",
    position: "relative",
    // Calculate the width based on fontSize expressed in rem and the word with more characters
    width: `calc((${fontSizeValueRem}rem / 2) * ${numMaxLengthChars} + 6.4rem)`,
  }),
  selectDropdownOpener: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    border: "3px solid #292929",
    borderRadius: "4px",
    cursor: "pointer",
  },
  closeDropdown: {
    transition: ".3s",
    display: "none",
  },
  openDropdown: ({ fontSizeValueRem }) => ({
    transition: ".3s",
    display: "block",
    top: `calc(2rem + ${fontSizeValueRem} + 6px)`,
  }),
  arrowDownIcon: {
    paddingLeft: "1rem",
    position: "relative",
    top: "2px",
    height: ({ fontSizeValueRem }) => `${fontSizeValueRem}rem`,
    ...transitionObject,
  },
  arrowDownIconReverse: {
    ...transitionObject,
    transform: "rotateX(180deg)",
  },
  optionsContainer: {
    position: "absolute",
    border: "3px solid #292929",
    borderBottomWidth: "1px",
    borderRadius: "0 4px 4px 4px",
    zIndex: 80,
  },
  selectDropdownCurrentValue: {
    fontSize: ({ fontSizeValueRem }) =>
      `${getFontSizeValue(fontSizeValueRem)}rem`,
  },
}));

/**
 * @param selectDropdownOptionsProp Array of objects which represents the list of options to select
 * @param nameFieldToShow Name of the field which contains the text to display in the menu options
 * @param defaultValue Default value that the dropdown assumes (Example: "Choose option")
 * @param closeAfterSelection If true the options menu will close once an option is selected by the user, otherwise the user will have to manually close the menu
 * @param fontSizeValueRem Numeric value of the font size expressed in rem
 * @param onChange Function to call every time an option is selected
 */
const SelectDropdown = memo(
  ({
    selectDropdownOptionsProp = [],
    nameFieldToShow = undefined,
    defaultValue = undefined,
    closeAfterSelection = false,
    fontSizeValueRem = 1.2,
    onChange = undefined,
  }) => {
    // define if a default value is passed
    const doesDefaultValueExist =
      defaultValue?.hasOwnProperty(nameFieldToShow) ?? false;

    const getFilteredSelectDropdownOptions = (
      selectOptions,
      nameFieldAccepted
    ) =>
      selectOptions.filter((item) => {
        return item && item.hasOwnProperty(nameFieldAccepted);
      });

    // return the length of the word with more characters inside selectDropdownOptionsProp list
    // (this is used to calculate previously the width of the select-dropdown)
    const getOptionMaxLengthNum = (listOptions) => {
      if (
        !Array.isArray(
          getFilteredSelectDropdownOptions(
            selectDropdownOptionsProp,
            nameFieldToShow
          )
        )
      ) {
        return 0;
      }
      // get the number value of the word with max length inside the array
      let value = Math.max(
        ...listOptions.map((item) => item[nameFieldToShow]?.length ?? 0)
      );

      let defaultValueLength = doesDefaultValueExist
        ? defaultValue[nameFieldToShow].length
        : 0;

      return Math.max(value, defaultValueLength);
    };

    // return the first object inside selectDropdownOptionsProp which has a field named as the content of nameFieldToShow
    const getFirstDropdownOptionWithNameFieldToShow = (listOptions) =>
      listOptions.find((option) => option?.[nameFieldToShow]);

    const getDefaultValueChoosenDropdownOptionState = (
      defaultValueExist = false
    ) => {
      if (defaultValueExist) {
        return defaultValue;
      } else if (
        Array.isArray(selectDropdownOptionsProp) &&
        selectDropdownOptionsProp.length > 0
      ) {
        return getFirstDropdownOptionWithNameFieldToShow(
          selectDropdownOptionsProp
        );
      } else {
        return [];
      }
    };

    // Styles
    const classes = useStyles({
      fontSizeValueRem,
      numMaxLengthChars: useMemo(() => {
        return getOptionMaxLengthNum(selectDropdownOptionsProp);
      }, [selectDropdownOptionsProp, defaultValue]),
    });

    // ******* START SECTION state *******
    const [selectOptionsState, setSelectOptionsState] = useState([]);
    const [menuOpenState, setMenuOpenState] = useState(false);
    const [
      choosenDropdownOptionState,
      setChoosenDropdownOptionState,
    ] = useState({
      positionIndex: 0,
      dataElement: {},
    });
    // ******* END SECTION state *******

    // Toggle the visibility of the select-dropdown
    const toggleMenuDropdown = () => setMenuOpenState(!menuOpenState);

    // handle what to do when an option in the menu is selected
    const selectDropdownOption = (newPositionIndex = 0, dataElement = {}) => {
      // update the upper section with the option choosen
      setChoosenDropdownOptionState({
        positionIndex: newPositionIndex,
        dataElement,
      });
      // called the function passed to update the parent component
      if (typeof onChange === "function") {
        onChange(dataElement);
      }
      // close the menu if the 'closeAfterSelection' prop is true
      if (closeAfterSelection) {
        setMenuOpenState(false);
      }
    };

    // return the HTML code obtained from the selectDropdownOptionsProp prop passed
    const getHTMLOptionsMenu = (selectOptions) => {
      let resultArray = [];

      if (Array.isArray(selectOptions)) {
        // return an array only with object which contain at least a field called as the content of nameFieldToShow
        let filteredArray = getFilteredSelectDropdownOptions(
          selectDropdownOptionsProp,
          nameFieldToShow
        );

        resultArray = filteredArray.map((option, index) => {
          const indexValue = doesDefaultValueExist ? index + 1 : index;

          return (
            <SingleOption
              key={indexValue}
              index={indexValue}
              optionName={option?.[nameFieldToShow]}
              dataElement={option}
              fontSizeRem={getFontSizeValue(fontSizeValueRem)}
              isThisSelected={
                choosenDropdownOptionState?.positionIndex === indexValue
              }
              selectDropdownOption={selectDropdownOption}
              tabIndex={0}
            />
          );
        });
      }

      const defaultElement = (
        <SingleOption
          key={0}
          index={0}
          optionName={
            doesDefaultValueExist ? defaultValue?.[nameFieldToShow] : ""
          }
          dataElement={defaultValue}
          fontSizeRem={getFontSizeValue(fontSizeValueRem)}
          isThisSelected={choosenDropdownOptionState?.positionIndex === 0}
          selectDropdownOption={selectDropdownOption}
          tabIndex={0}
        />
      );

      // if there's the default value object, then return an array with the default object as the first element of the array
      // otherwise return just the array (resultArray)
      return doesDefaultValueExist
        ? [defaultElement, ...resultArray]
        : resultArray;
    };

    // Event Key handlers
    const eventKeyHandlers = (event) => {
      // trigger event when "Enter" button is clicked
      if (event.keyCode === 13) {
        toggleMenuDropdown();
      }
    };

    // update the visible element (not the one in the options' menu), every time the props in the array below change
    useEffect(() => {
      setChoosenDropdownOptionState({
        positionIndex: 0,
        dataElement: defaultValue,
      });
    }, [selectDropdownOptionsProp, nameFieldToShow, defaultValue]);

    // update the menu options list every time the state/props in the array below change
    useEffect(() => {
      const HTMLOptionsMenu = getHTMLOptionsMenu(selectDropdownOptionsProp);
      setSelectOptionsState(HTMLOptionsMenu);
    }, [
      selectDropdownOptionsProp,
      nameFieldToShow,
      defaultValue,
      choosenDropdownOptionState,
    ]);

    // update the visible element (not the one in the options' menu), every time the defaultValue changes
    useEffect(() => {
      const defaultValue = getDefaultValueChoosenDropdownOptionState(
        doesDefaultValueExist
      );

      setChoosenDropdownOptionState({
        positionIndex: 0,
        dataElement: defaultValue,
      });
    }, [defaultValue]);

    return (
      <div id="select-dropdown" className={classes.selectDropdown}>
        <div
          tabIndex={0}
          onKeyDown={eventKeyHandlers}
          className={classes.selectDropdownOpener}
          onClick={toggleMenuDropdown}
        >
          <p className={classes.selectDropdownCurrentValue}>
            {choosenDropdownOptionState?.dataElement?.[nameFieldToShow]}
          </p>
          <ArrowDown
            className={`${classes.arrowDownIcon} ${
              menuOpenState ? classes.arrowDownIconReverse : ""
            }`}
          />
        </div>
        <ul
          className={`${classes.optionsContainer} ${
            menuOpenState ? classes.openDropdown : classes.closeDropdown
          }`}
        >
          {selectOptionsState}
        </ul>
      </div>
    );
  }
);

export default SelectDropdown;
