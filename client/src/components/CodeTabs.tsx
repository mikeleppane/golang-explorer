import React from "react";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import {
  changeCurrentTab,
  deleteCode,
  newTemplateCode,
} from "../state/actionCreators";
import { confirm } from "react-confirm-box";

let maxTabIndex = 0;
//let currentTabIndex = 0;

export default function CodeTabs() {
  const [currentTabId, setTabId] = React.useState(0);
  const [tabs, setAddTab] = React.useState<{ codeTabId: number }[]>([]);
  const dispatch = useDispatch();
  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTabId: number | string
  ) => {
    if (newTabId === "newTab") {
      handleAddTab();
    } else {
      if (
        typeof newTabId === "number" &&
        (tabs.find((tab) => tab.codeTabId === newTabId) || newTabId === 0)
      ) {
        setTabId(newTabId);
        dispatch(changeCurrentTab(newTabId));
      }
    }
  };

  const handleTabRemove = (id: number) => {
    void confirm(`Are you sure you want to remove tab ${id}`).then((result) => {
      if (result) {
        if (id !== currentTabId) {
          return;
        }
        if (id === maxTabIndex && tabs.length > 1) {
          maxTabIndex = tabs[tabs.length - 2].codeTabId;
          setTabId(maxTabIndex);
          dispatch(changeCurrentTab(maxTabIndex));
        } else if (tabs.length === 1) {
          setTabId(0);
          maxTabIndex = 0;
          dispatch(changeCurrentTab(0));
        } else if (id < maxTabIndex && tabs.length > 1) {
          maxTabIndex = tabs[tabs.length - 1].codeTabId;
          setTabId(maxTabIndex);
          dispatch(changeCurrentTab(maxTabIndex));
        }
        setAddTab(tabs.filter((tab) => tab.codeTabId !== id));
        dispatch(deleteCode(id));
      }
    });
  };

  const handleAddTab = () => {
    maxTabIndex = maxTabIndex + 1;
    const id = maxTabIndex;
    const sortedTabs = [...tabs, { codeTabId: id }];
    sortedTabs.sort(function (a, b) {
      if (a.codeTabId < b.codeTabId) return -1;
      if (a.codeTabId > b.codeTabId) return 1;
      return 0;
    });
    setAddTab(sortedTabs);
    setTabId(id);
    dispatch(changeCurrentTab(id));
    dispatch(newTemplateCode());
  };

  return (
    <Box sx={{ bgcolor: "#505050", flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#505050",
        }}
      >
        <Tabs
          value={currentTabId}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={true}
        >
          <Tab label="Main" value={0} sx={{ color: "white", fontSize: 16 }} />
          {tabs.length > 0 &&
            tabs.map((tab) => {
              return (
                <Tab
                  key={tab.codeTabId}
                  label={`Code ${tab.codeTabId}`}
                  value={tab.codeTabId}
                  icon={
                    <ClearIcon
                      fontSize="small"
                      sx={{
                        marginLeft: "10px",
                        "&:hover": {
                          color: "red",
                          backgroundColor: "#797D7F",
                        },
                      }}
                      onClick={() => {
                        handleTabRemove(tab.codeTabId);
                      }}
                    />
                  }
                  iconPosition="end"
                  sx={{
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    minHeight: "15px",
                    color: "white",
                    fontSize: 16,
                  }}
                />
              );
            })}
          <Tab
            icon={<PostAddIcon />}
            value="newTab"
            style={{ color: "white" }}
          />
        </Tabs>
      </AppBar>
    </Box>
  );
}
