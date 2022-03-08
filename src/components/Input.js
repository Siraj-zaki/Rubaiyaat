import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        color: 'white'
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'white !important'
    }
}));


const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

export default function BasicTextFields({ value, onChangeEvent, width, name, require, placeholder, type, secure, textarea, rows, minWidth, margin, disabled }) {
    const classes = useStyles();
    return (
        <TextField disabled={disabled || false} className='input-mat' InputProps={{ classes: { notchedOutline: classes.notchedOutline } }} size='small' rows={rows} multiline={textarea ? true : false} placeholder={placeholder} required={require} type={secure} inputMode={type} security inputProps={{ className: 'text-field-label' }} InputLabelProps={{ className: "text-field-label", shrink: true, }} color="secondary" style={{ width: 300, minWidth: minWidth ? minWidth : "", marginTop: margin ? margin : '10px' }} value={value} name={name} onChange={onChangeEvent} id="outlined-basic" label={name ? name : ""} variant="outlined" />
    );
}