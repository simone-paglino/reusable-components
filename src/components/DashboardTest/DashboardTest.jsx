import React, { useState, useRef } from "react";
// Constants
import { TEST } from "../../constants";
// Material UI
import { TextField, FormControlLabel, Switch, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Components
import SelectDropdown from "../SelectDropdown/SelectDropdown";

const useStyles = makeStyles((theme) => ({
  formBaseStyle: {
    display: "flex",
    justifyContent: "space-around",
    position: "absolute",
    width: "100%",
    bottom: "25vh",
  },
}));

const DashboardTest = () => {
  const classes = useStyles();

  const defaultNameFieldToShow = "name";
  const defaultDefaultValue = { id: -1, name: "Choose an option" };
  const defaultFontSizeRem = 1.2;

  const defaultValueRef = useRef();
  const fontSizeRemRef = useRef();
  const JSONRef = useRef();
  const nameFieldToShowRef = useRef();

  const [stateProps, setStateProps] = useState({
    nameFieldToShow: defaultNameFieldToShow,
    closeAfterSelection: true,
    fontSizeValueRem: 1.2,
    defaultValue: defaultDefaultValue,
    selectDropdownOptions: TEST.SELECT_DROPDOWN,
  });

  const [toggleState, setToggleState] = useState(
    stateProps.closeAfterSelection
  );

  const getParsedJSON = (jsonToParse) => {
    try {
      // get the JSON parsed
      return JSON.parse(jsonToParse);
    } catch (exc) {
      console.error(exc);
      return undefined;
    }
  };

  const getValidateJSON = (json = {}, fallbackValue = {}) => {
    // the json must be a string and its length needs to be > 1
    if (typeof json !== "string" || json.length === 0) {
      return fallbackValue;
    }
    let parsedJSON = getParsedJSON(json);

    if (parsedJSON !== undefined) {
      return parsedJSON;
    } else {
      // remove blank spaces
      let JSONNoSpaces = json.replace(/\s/g, "");
      let parsedJSONNoSpaces = getParsedJSON(JSONNoSpaces);
      return parsedJSONNoSpaces === undefined
        ? fallbackValue
        : parsedJSONNoSpaces;
    }
  };

  const updateState = () => {
    const newJSONInsertedList = getValidateJSON(JSONRef.current.value, []);
    const defaultValueJSON = getValidateJSON(defaultValueRef.current.value, []);

    setStateProps({
      ...stateProps,
      nameFieldToShow: nameFieldToShowRef.current.value,
      fontSizeValueRem: fontSizeRemRef.current.value,
      defaultValue: defaultValueJSON,
      selectDropdownOptions: newJSONInsertedList,
      closeAfterSelection: toggleState,
    });
  };

  return (
    <>
      <SelectDropdown
        onChange={(obj) =>
          console.log(
            `This is the onchange function! Value selected => ${
              obj[stateProps.nameFieldToShow]
            }`
          )
        }
        closeAfterSelection={stateProps?.closeAfterSelection}
        defaultValue={
          typeof stateProps?.defaultValue === "string"
            ? JSON.parse(stateProps?.defaultValue)
            : stateProps?.defaultValue
        }
        selectDropdownOptionsProp={stateProps?.selectDropdownOptions}
        nameFieldToShow={stateProps?.nameFieldToShow}
        fontSizeValueRem={stateProps?.fontSizeValueRem}
      />
      <div className={classes.formBaseStyle}>
        <TextField
          label="Default value"
          variant="outlined"
          defaultValue={JSON.stringify(defaultDefaultValue)}
          inputRef={defaultValueRef}
        />
        <TextField
          label="Font size (rem)"
          variant="outlined"
          defaultValue={defaultFontSizeRem}
          inputRef={fontSizeRemRef}
        />
        <TextField
          label="JSON objects array"
          variant="outlined"
          defaultValue={JSON.stringify(TEST.SELECT_DROPDOWN)}
          inputRef={JSONRef}
        />
        <TextField
          label="Name field to show"
          variant="outlined"
          defaultValue={defaultNameFieldToShow}
          inputRef={nameFieldToShowRef}
        />
        <FormControlLabel
          control={
            <Switch
              checked={toggleState}
              onChange={() => setToggleState(!toggleState)}
              name="checkedB"
              color="primary"
            />
          }
          label="Close after selection"
        />
        <Button variant="contained" color="primary" onClick={updateState}>
          UPDATE
        </Button>
      </div>
    </>
  );
};

export default DashboardTest;
