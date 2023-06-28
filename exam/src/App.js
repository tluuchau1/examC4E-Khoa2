import logo from "./logo.svg";
import "./App.css";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState, useRef, useEffect } from "react";
import { IconButton } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function App() {
  const [value, setValue] = useState(0);
  const [input, setInput] = useState("");
  const fullList = useRef([]);
  const [list, setList] = useState([]);
  const handleSubmit = () => {
    const id = "id" + Math.random().toString(16).slice(2);

    const newList = [
      ...list,
      {
        id: id,
        label: input,
        isCompleted: false,
      },
    ];
    // const newList = [...list, newTask];
    setList(newList);
    fullList.current = newList;
    setInput("");

    localStorage.setItem("todoList", JSON.stringify(newList));
  };
  const handleDelete = () => {
    setList([]);
    fullList.current = fullList.current.filter(
      (obj) => obj.isCompleted === false
    );
    localStorage.removeItem("todoList");
  };

  const handleChange = (event, newValue) => {
    let filteredList = fullList.current;
    if (Number(newValue) === 1) {
      filteredList = filteredList.filter((obj) => obj.isCompleted === false);
    }
    if (Number(newValue) === 2) {
      filteredList = filteredList.filter((obj) => obj.isCompleted === true);
    }
    setList(filteredList);
    setValue(Number(newValue));
  };

  useEffect(() => {
    const storedList = localStorage.getItem("todoList");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  return (
    <div className="wrapper">
      <h1>#todo</h1>
      <Box className="box" sx={{ width: "50%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Active" {...a11yProps(1)} />
            <Tab label="Completed" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <>
            {Number(value) !== 2 && (
              <div className="input">
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="add details"
                  variant="outlined"
                />
                <Button
                  onClick={handleSubmit}
                  className="btn"
                  variant="contained"
                  size="small"
                >
                  Add
                </Button>
              </div>
            )}
            {list?.map((item) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    onChange={() => {
                      const indexItem = fullList.current.findIndex(
                        (obj) => obj.id === item.id
                      );
                      let cloneList = JSON.parse(
                        JSON.stringify(fullList.current)
                      );
                      cloneList[indexItem].isCompleted =
                        !cloneList[indexItem].isCompleted;
                      fullList.current = cloneList;
                      if (Number(value) === 1) {
                        cloneList = cloneList.filter(
                          (obj) => obj.isCompleted === false
                        );
                      }
                      if (Number(value) === 2) {
                        cloneList = cloneList.filter(
                          (obj) => obj.isCompleted === true
                        );
                      }
                      setList(cloneList);
                    }}
                    className={item.isCompleted && "checked"}
                    checked={item.isCompleted}
                    control={<Checkbox />}
                    label={item.label}
                  />
                </FormGroup>
                {Number(value) === 2 && (
                  <IconButton
                    onClick={() => {
                      let indexItem = fullList.current.findIndex(
                        (obj) => obj.id === item.id
                      );
                      fullList.current.splice(indexItem, 1);
                      indexItem = list.findIndex((obj) => obj.id === item.id);
                      list.splice(indexItem, 1);
                      setList([...list]);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <>
            {Number(value) !== 2 && (
              <div className="input">
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="add details"
                  variant="outlined"
                />
                <Button
                  onClick={handleSubmit}
                  className="btn"
                  variant="contained"
                  size="small"
                >
                  Add
                </Button>
              </div>
            )}
            {list?.map((item) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    onChange={() => {
                      const indexItem = fullList.current.findIndex(
                        (obj) => obj.id === item.id
                      );
                      let cloneList = JSON.parse(
                        JSON.stringify(fullList.current)
                      );
                      cloneList[indexItem].isCompleted =
                        !cloneList[indexItem].isCompleted;
                      fullList.current = cloneList;
                      if (Number(value) === 1) {
                        cloneList = cloneList.filter(
                          (obj) => obj.isCompleted === false
                        );
                      }
                      if (Number(value) === 2) {
                        cloneList = cloneList.filter(
                          (obj) => obj.isCompleted === true
                        );
                      }
                      setList(cloneList);
                    }}
                    className={item.isCompleted && "checked"}
                    checked={item.isCompleted}
                    control={<Checkbox />}
                    label={item.label}
                  />
                </FormGroup>
                {Number(value) === 2 && (
                  <IconButton
                    onClick={() => {
                      let indexItem = fullList.current.findIndex(
                        (obj) => obj.id === item.id
                      );
                      fullList.current.splice(indexItem, 1);
                      indexItem = list.findIndex((obj) => obj.id === item.id);
                      list.splice(indexItem, 1);
                      setList([...list]);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <>
            {Number(value) !== 2 && (
              <div className="input">
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  fullWidth
                  id="outlined-basic"
                  label="add details"
                  variant="outlined"
                />
                <Button
                  onClick={handleSubmit}
                  className="btn"
                  variant="contained"
                  size="small"
                >
                  Add
                </Button>
              </div>
            )}
            {list.map((item) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    onChange={() => {
                      const indexItem = fullList.current.findIndex(
                        (obj) => obj.id === item.id
                      );
                      let cloneList = JSON.parse(
                        JSON.stringify(fullList.current)
                      );
                      cloneList[indexItem].isCompleted =
                        !cloneList[indexItem].isCompleted;
                      fullList.current = cloneList;
                      if (Number(value) === 1) {
                        cloneList = cloneList.filter(
                          (obj) => obj.isCompleted === false
                        );
                      }
                      if (Number(value) === 2) {
                        cloneList = cloneList.filter(
                          (obj) => obj.isCompleted === true
                        );
                      }
                      setList(cloneList);
                    }}
                    className={item.isCompleted && "checked"}
                    checked={item.isCompleted}
                    control={<Checkbox />}
                    label={item.label}
                  />
                </FormGroup>
                {Number(value) === 2 && (
                  <IconButton
                    onClick={() => {
                      let indexItem = fullList.current.findIndex(
                        (obj) => obj.id === item.id
                      );
                      fullList.current.splice(indexItem, 1);
                      indexItem = list.findIndex((obj) => obj.id === item.id);
                      list.splice(indexItem, 1);
                      setList([...list]);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                )}
              </div>
            ))}
          </>
          <div className="box-delete">
            <div onClick={handleDelete} className="delete-all">
              <DeleteOutlineIcon />
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
export default App;
