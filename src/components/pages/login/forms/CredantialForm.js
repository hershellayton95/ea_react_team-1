import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Loginutton = styled(Button)({
    height: "50px",
    fontSize: "1.3rem",
    lineHeight: 1.5,
    color: "white",
    fontWeight: "bold"
});

const CredentialForm = () => {
    require("./form.scss");

    const [checkboxColor, setCheckboxColor] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/auth/login', {
                credentials: "include",
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (data.message === "login eseguito") {
                navigate("/");
            } else {
                console.log(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography color="white.main" variant="body2"><strong>E-MAIL</strong></Typography>
            <TextField
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder='Inserisci il tuo indirizzo e-mail'
            />
            <Typography color="white.main" variant="body2"><strong>PASSWORD</strong></Typography>
            <TextField
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder='Password'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ width: "40px", height: "30px", backgroundColor: "#242635", borderRadius: "5px" }}
                            >
                                {showPassword ? <VisibilityOffIcon
                                    style={{ color: 'white', transform: "scale(0.7, 0.7)" }} /> : <VisibilityIcon
                                    style={{ color: 'white', transform: "scale(0.7, 0.7)" }} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <FormControlLabel
                control={<Checkbox name="remember" color="primary" style={{ color: checkboxColor ? 'white' : "#235fe3" }} />}
                onClick={() => { setCheckboxColor(b => !b) }}
                label="Ricordami"
                style={{ color: 'white' }}
            />
            <Loginutton
                type='submit'
                variant="contained"
                size="large"
                color="primary"
                fullWidth
                margin="normal"
            >
                Accedi
            </Loginutton>
        </form>

    );
};

export default CredentialForm;
