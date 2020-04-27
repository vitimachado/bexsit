import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { useDispatch } from 'react-redux';
import { SAVE_MESSAGE } from '../../store/actions/actionTypes';
import { setQuestion, setAnswer, refreshHome, registerUser, authenticateUser, redirect } from '../../store/actions';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export const LoginForm = ({create}) => {

    //console.log('create', create);
    const [value, setValue] = useState({
        nome: '',
        password: '',
        newPassword: '',
        showPasswordSenha: false,
        showPasswordNovaSenha: false,
        errorMsg: '',
        successMsg: ''
    });

    const handleChange = (e) => {
        //console.log([e.target.name], e.target.value)
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = (valuePass) => {
        let values = valuePass === 'Senha' ? { ...value, showPassword: !value.showPassword } : { ...value, showPasswordNovaSenha: !value.showPasswordNovaSenha };
        //console.log(values);
        setValue(values);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleClick = (e) => {

        if(create && value.password !== value.newPassword) {
            setValue({ ...value, errorMsg: 'Senha e confirmação de senha diferentes.' });
            return null;
        }

        value.nome = new String(value.nome).trim();
        value.password = new String(value.password).trim();

        //console.log(value);
        if(create) registerUser(value).then((res, error) => { 
                if(res && !res.error ){ 
                    //console.log('registerUser', res, error);
                    if(res.statusCode === "201")  setValue({ ...value, errorMsg: '', nome: '', password: '', newPassword: '', successMsg: 'Usuário Cadastrado.' });
                    else setValue({ ...value, errorMsg: 'Nome já cadastrado.', successMsg: '' });
                }
                else { setValue({ ...value, errorMsg: 'Nome já cadastrado.', successMsg: '' }); }
            });
        else authenticateUser(value).then((res, error) => { 
            // if(res && !res.error ){ //console.log('authenticateUser', res, error);} 
            // else //console.log('error authenticateUser', res, error);
            
            if(res && !res.error ){ 
                //console.log('authenticateUser', res, error);
                if(res.statusCode === "202")  {
                    setValue({ ...value, errorMsg: '', nome: '', password: '', newPassword: '', successMsg: 'Usuário Logado. Aguarde...' });  
                    localStorage.setItem('@token/bexsit', res.data.token);                  
                    redirect('/');
                }
                else setValue({ ...value, errorMsg: 'Usuário não cadastrado.', successMsg: '' });
            }
            else { setValue({ ...value, errorMsg: 'Usuário não cadastrado.', successMsg: '' });}
        });
         
    };    

    const contructPassword = (title, valuePass) => {

        //console.log('valuePass', title);
        let valueType = title === 'Senha' ? value.showPassword : value.showPasswordNovaSenha;
        let valueName = title === 'Senha' ? "password" : "newPassword";
        //console.log('contructPassword', valueType);

        return (
            <>
                <InputLabel htmlFor="standard-adornment-password" style={{ marginTop: 20 }}>{title}</InputLabel>
                <Input
                    name={valueName}
                    id="standard-adornment-password"
                    type={valueType ? 'text' : 'password'}
                    value={valuePass}
                    onChange={handleChange}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword(title)}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {valueType ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                    style={{width: '-webkit-fill-available'}} 
                />
            </>
        )
    }

    let bntTitle = create ? "Cadastrar" : "Logar";
    let title = create ? "Ou faça seu cadastro." : "Faça seu login.";
    let disabledBnt = create && value.nome.length > 0 && value.password.length > 0 && value.newPassword.length > 0 ? false 
                    : !create && value.nome.length > 0 && value.password.length > 0 ? false : true;
        
    return (
        <div className="col">
            <div className="row">
                <h3 className="col">{title}</h3>
            </div>
            <div className="row">
                <div className="col">                
                    <span style={{ fontSize: 'small', color: "blue" }}>{value.successMsg}</span>
                    <span style={{ fontSize: 'small', color: "red" }}>{value.errorMsg}</span>
                    <form noValidate autoComplete="off">    
                    
                        <TextField
                            id="standard-full-width"
                            name="nome"
                            label="Nome"
                            value={value.nome}
                            style={{ fontSize: 'small' }}
                            placeholder=""
                            fullWidth
                            onChange={handleChange}
                        />                    
                        { contructPassword("Senha", value.password) }
                        { create ? contructPassword("Escreva Novamente a Senha", value.newPassword) : null }
                    </form>
                </div>
            </div>
            <div className="row" style={{ marginTop: 20 }}>
                <div className="col">
                    <Button variant="contained" onClick={() => handleClick()} disabled={disabledBnt}
                        style={{ 
                            background: '#4BDE95',                        
                            width: '-webkit-fill-available',
                            color: 'white' }}>
                        {bntTitle}
                    </Button>
                </div>
            </div>
        </div>
    )
}