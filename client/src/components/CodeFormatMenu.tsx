import React from "react";
import Button from "@mui/material/Button";
import CodeIcon from "@mui/icons-material/Code";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import codeService from "../services/codeService";
import { addNewCode, setStatus } from "../state/actionCreators";

export default function FormatCodeMenu() {
  const dispatch = useAppDispatch();
  const code = useAppSelector((state) => state.code);

  const handleFormatMenu = () => {
    dispatch(setStatus("Wait for code formatting..."));
    codeService
      .formatCode({ code })
      .then((response) => {
        if (response && typeof response === "string") {
          dispatch(addNewCode(response));
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginLeft: "30px", backgroundColor: "#64748B" }}
        endIcon={<CodeIcon />}
        onClick={handleFormatMenu}
      >
        Format
      </Button>
    </div>
  );
}
