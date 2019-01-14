import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';

import { Creators as CreatorsUser } from '../store/ducks/user';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    //margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

class PersonalForm extends React.Component {
  state = {
    showPassword: false,
    password: '',
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = prop => event => {
    this.props.setDadosFormulario({ [prop]: event.target.value, errors: { ...this.props.errors, [prop]: '' }});
  };

  render() {
    const { classes, nome, sobrenome, email, senha, errors} = this.props;
    return (
      <React.Fragment>
        <Typography component="h6" variant="p" gutterBottom>
          {'Dados pessoais'}
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Nome"
              value={nome}
              fullWidth
              autoComplete="fname"
              onChange={this.handleChange('nome')}
            />
            { errors.nome &&
              <FormHelperText id="name-error-text" error>{errors.nome}</FormHelperText>
             }
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Sobrenome"
              value={sobrenome}
              fullWidth
              autoComplete="lname"
              onChange={this.handleChange('sobrenome')}
            />
            { errors.sobrenome &&
              <FormHelperText id="name-error-text" error>{errors.sobrenome}</FormHelperText>
             }
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="E-mail"
              value={email}
              fullWidth
              onChange={this.handleChange('email')}
            />
             { errors.email &&
              <FormHelperText id="name-error-text" error>{errors.email}</FormHelperText>
             }
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
              <InputLabel htmlFor="adornment-password">Senha</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={senha}
                onChange={this.handleChange('senha')}
                //onChange={this.handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              { errors.senha ?
              <FormHelperText id="name-error-text" error>{errors.senha}</FormHelperText> : <FormHelperText id="weight-helper-text">{'A senha poderá ser usada para fazer login no aplicativo do evento'}</FormHelperText>
             }
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  nome: state.userReducer.nome,
  sobrenome: state.userReducer.sobrenome,
  email: state.userReducer.email,
  senha: state.userReducer.senha,
  errors: state.userReducer.errors,
});

export default connect(mapStateToProps, { ...CreatorsUser })(withStyles(styles)(PersonalForm));
