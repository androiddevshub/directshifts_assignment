import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import './dashboard.css';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";


export default function DashboardPage() {

  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [referralsData, setReferralsData] = useState([]);

  useEffect(() => {
    if (!localStorage.token) {
      navigate('/');
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    axios.get(`/api/user_referrals?auth_token=${localStorage.auth_token}`)
      .then((response) => {
        setReferralsData(response.data.data)
      });
  },[loading]);

  const handleInviteSend = () => {
    setLoading(true);
    axios
    .post('/api/user_referrals', {
      email: inviteEmail,
      auth_token: localStorage.auth_token
    })
    .then((response) => {
      setInviteEmail("");
      setLoading(false);
      alert(response.data.message);
    }).catch((error) => {
      alert(error.response.data.message);
    });
  };

  return (
    <div className="container">
      <div className="logout-button">
        <Button onClick={handleLogout} variant="outlined" startIcon={<LogoutIcon/>} >
          Logout
        </Button>
      </div>
      <div className="main">
        <div className="send-email">
          <div className="invite-text">
            <Typography  component="h4" variant="h5">
              Send a referral mail and invite your friends
            </Typography>
          </div>
          <div className="input-button-div">
            <div className="email-input">
              <TextField
                required
                size="small"
                id="outlined-required"
                label="Email address"
                type="email"
                value={inviteEmail}
                onChange={(e)=> setInviteEmail(e.target.value)}
              />
            </div>
            <div className="send-button">
              <LoadingButton
                variant="contained"
                loading={loading}
                loadingPosition="end"
                onClick={handleInviteSend}
                endIcon={<SendIcon />}>
                {loading ? "Sending": "Send"}
              </LoadingButton>
            </div>
          </div>
          <div className="referral-table">
            <div className="referral-sent-text">
              <Typography  component="h4" variant="h5">
                Refferals sent
              </Typography>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No.</TableCell>
                    <TableCell align="center">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {referralsData.map((row, index) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index+1}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
         
         
        </div>
      </div>
    </div>
  )
}