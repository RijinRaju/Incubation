import React, { useState,useEffect,useContext } from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Paper from "@mui/material/paper"
import Header from '../Header/Header'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext';

function UserHome() {

const[slots,setSlots] = useState([])

const {user} = useContext(AuthContext)



    useEffect(()=>{

        axios
          .post("http://127.0.0.1:8000/booked_slots/", {
            id: user.user_id,
          })
          .then((e) => {
            
            setSlots(e.data)
          });
       
    },[])

  return (
    <div>
      <Header />
      <Typography variant="h5" component="h2">
        Booked Slotes
      </Typography>
      {slots.map((slot) => (
        <Paper
        
          elevation={3}
          style={{ width: 200, backgroundColor: "rgb(25 118 210)",margin:10 }}
        >
          <Card
            sx={{ maxWidth: 200, margin: 2 }}
            style={{ justifyContent: "end" }}
          >
            <CardActionArea>
              <Typography variant="h4">{slot.company_name}</Typography>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                <Typography variant="body2" color="text.secondary">
                  <Typography variant="h5">Slot No.{slot.slot}</Typography>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Paper>
      ))}
    </div>
  );
}

export default UserHome