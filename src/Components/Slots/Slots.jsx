import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function Slots() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const [slot, setSlote] = useState(0);
  const [regslots, setRegSlot] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [cmp, setCmp] = useState("");
  const [allot, setAllot] = useState([]);

  useEffect(() => {
    allotedFun();
  }, []);

  const allotedFun = () => {
    let allot_arr;
    fetch("http://127.0.0.1:8000/allotted_slot/", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((datas) => {
        allot_arr = datas.map((data) => {
          return data.slot;
        });

        setAllot(allot_arr);
      });
  };

  const slotAllot = () => {
    fetch("http://127.0.0.1:8000/regslot/", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRegSlot(data);
        handleClickOpen();
      });
  };

  const cmpSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/addslot/", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        cmp_name: cmp,
        slot: slot,
      }), //passing data into api
    })
      .then((response) => response.json())
      .then((e) => {
        allotedFun();
        handleClose();
      });
  };

  const cmpChange = (e) => {
    setCmp(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Grid container justify="center" spacing={3}>
        {arr.map((ar) => {
          return (
            <Grid item>
              {allot.includes(ar) ? (
                <Box
                  component="button"
                  value={slot}
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "text.secondary",
                  }}
                ></Box>
              ) : (
                <Box
                  component="button"
                  value={slot}
                  onClick={() => {
                    setSlote(ar);
                    slotAllot();
                  }}
                  sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: "primary.main",
                  }}
                ></Box>
              )}
            </Grid>
          );
        })}
      </Grid>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Select a Company</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={cmpSubmit}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                native
                id="grouped-native-select"
                label="Grouping"
                className="cmp_name"
                value={cmp}
                onChange={cmpChange}
              >
                {regslots.map((regs) => (
                  <option key={regs.id} value={regs.company_name}>
                    {regs.company_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Ok</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Slots;
