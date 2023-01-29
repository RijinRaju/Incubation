import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import DialogContentText from "@mui/material/DialogContentText";

function App_list() {

const [open, setOpen] = useState(false);
const[id,setId] = useState(0)
const[view,setView] = useState([])
const [newlists,setNewlist] = useState([])
const [pendlists,setPendlist] = useState([])
const [approvelists,setApprovelist] = useState([])

const pendFun=()=>{
axios.get(" http://127.0.0.1:8000/pend_list").then((e) => {
  setPendlist(e.data);
  console.log(e.data);
});
}

const appFun = () => {
  axios.get(" http://127.0.0.1:8000/approved_list").then((e) => {
    setApprovelist(e.data);
    console.log(e.data);
  });
};


useEffect(()=>{
pendFun() 
appFun()
 axios.get(" http://127.0.0.1:8000/new_list").then((e) => {
   setNewlist(e.data);
 });
},[])


const handleClickOpen = (e) => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const [confirmOpen, setConfirmOpen] = React.useState(false);

const handleConfirmClickOpen = () => {
  
  setConfirmOpen(true);
};

const handleConfirmClose = () => {
  setConfirmOpen(false);
};

const handleConfirmSubmit = () => {
  
  axios
    .post("http://127.0.0.1:8000/declined/", {
      id: id,
    })
    .then((e) => {
      pendFun();
    });
    setConfirmOpen(false);
};

  return (
    <div>
      <TableContainer component={Paper}>
        <Typography ml={2}>
          <h3>New Applications</h3>
        </Typography>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">RID</TableCell>
              <TableCell align="right">NAME</TableCell>
              <TableCell align="right">EMAIL</TableCell>
              <TableCell align="right">COMPANY NAME</TableCell>
              <TableCell align="right">VIEW</TableCell>
              <TableCell align="right">PROCESS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newlists.map((newlist) => (
              <TableRow
                key={newlist.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {newlist.id}
                </TableCell>
                <TableCell align="right">{newlist.name}</TableCell>
                <TableCell align="right">{newlist.email}</TableCell>
                <TableCell align="right">{newlist.company_name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      axios
                        .post(` http://127.0.0.1:8000/view_new_list/`, {
                          id: newlist.id,
                        })
                        .then((e) => {
                          console.log(e.data);
                          setView(e.data);

                          handleClickOpen();
                        });
                    }}
                  >
                    view
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      axios
                        .post("http://127.0.0.1:8000/process/", {
                          id: newlist.id,
                        })
                        .then((e) => {
                          setNewlist((value) => e.data);
                          pendFun();
                        });
                    }}
                    color="error"
                  >
                    Process
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* pending list */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Typography ml={2}>
          <h3>Pending List</h3>
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">RID</TableCell>
              <TableCell align="right">NAME</TableCell>
              <TableCell align="right">COMPANY NAME</TableCell>
              <TableCell align="right">VIEW</TableCell>
              <TableCell align="right">Approve</TableCell>
              <TableCell align="right">Decline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendlists.map((pendlist) => (
              <TableRow
                key={pendlist.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {pendlist.id}
                </TableCell>
                <TableCell align="right">{pendlist.name}</TableCell>
                <TableCell align="right">{pendlist.company_name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      axios
                        .post(` http://127.0.0.1:8000/view_pend_list/`, {
                          id: pendlist.id,
                        })
                        .then((e) => {
                          console.log(e.data);
                          setView(e.data);

                          handleClickOpen();
                        });
                    }}
                  >
                    view
                  </Button>
                </TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      axios
                        .post(` http://127.0.0.1:8000/approved/`, {
                          id: pendlist.id,
                        })
                        .then((e) => {
                          setPendlist((v) => e.data);
                          appFun();
                        });
                    }}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(e) => {
                      handleConfirmClickOpen();
                      setId(pendlist.id);
                    }}
                  >
                    Decline
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Declined list */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Typography ml={2}>
          <h3>Approved List</h3>
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">RID</TableCell>
              <TableCell align="right">NAME</TableCell>
              <TableCell align="right">EMAIL</TableCell>
              <TableCell align="right">COMPANY NAME</TableCell>
              <TableCell align="right">PROCESS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approvelists.map((list) => (
              <TableRow
                key={list.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {list.id}
                </TableCell>
                <TableCell align="right">{list.name}</TableCell>
                <TableCell align="right">{list.email}</TableCell>
                <TableCell align="right">{list.company_name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => {
                      axios
                        .post(` http://127.0.0.1:8000/view_approved_list/`, {
                          id: list.id,
                        })
                        .then((e) => {
                          setView(e.data);

                          handleClickOpen();
                        });
                    }}
                  >
                    view
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* view popup modal */}
      <Box component="form" noValidate>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>VIEW</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid xs={5}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  name="first_name"
                  fullWidth
                  variant="outlined"
                  value={view[0] ? view[0].name : null}
                />
              </Grid>
              <Grid xs={7}>
                <TextField
                  margin="dense"
                  id="name"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={view[0] ? view[0].email : null}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  margin="dense"
                  id="cmp_name"
                  label="Company Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={view[0] ? view[0].company_name : null}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  margin="dense"
                  id="DescribeProduct"
                  label="Describe Product"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={view[0] ? view[0].describeProduct : null}
                />
              </Grid>
              <Grid xs={8}>
                <TextField
                  margin="dense"
                  id="phone"
                  label="Phone"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={view[0] ? view[0].phone : null}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  margin="dense"
                  id="DescribeTeam"
                  label="Describe Team"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={view[0] ? view[0].describeTeam : null}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* dialog for decline the registerer */}

      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are You sure .you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Disagree</Button>
          <Button onClick={handleConfirmSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App_list
