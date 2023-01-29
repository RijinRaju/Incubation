import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Status() {
  
    const[datas,setDatas] =  useState([])
    useEffect(()=>{
            axios.get(' http://127.0.0.1:8000/status').then((e)=>{
                setDatas(e.data)
                console.log(e.data)
            })
    },[])
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">NAME</TableCell>
              <TableCell align="right">EMAIL</TableCell>
              <TableCell align="right">COMPANY NAME</TableCell>
              <TableCell align="right">STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data) => {

                return (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {data.id}
                    </TableCell>
                    <TableCell align="right">{data.name}</TableCell>
                    <TableCell align="right">{data.email}</TableCell>
                    <TableCell align="right">{data.company_name}</TableCell>
                    {data.processing === true &&
                    data.declined === false &&
                    data.approved === false ? (
                      <TableCell align="right" style={{ color: "blue" }}>
                        Processing
                      </TableCell>
                    ) : data.declined === true && data.approved === false ? (
                      <TableCell align="right" style={{ color: "red" }}>
                        Declined
                      </TableCell>
                    ) : (
                      <TableCell align="right" style={{ color: "green" }}>
                        Approved
                      </TableCell>
                    )}
                  </TableRow>
                );}   
)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Status