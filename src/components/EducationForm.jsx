import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Creators as CreatorsUser } from '../store/ducks/user';

class EducationForm extends React.Component {
  handleChange = prop => event => {
    this.props.setDadosFormulario({ [prop]: event.target.value, errors: { ...this.props.errors, [prop]: '' }});
  };

  render() {
    const { nomeInstituicao, curso, fera, errors } = this.props;
    return (
      <React.Fragment>
        <Typography component="h6" variant="p" gutterBottom>
          {'Escolaridade'}
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <TextField required id="nomeInstituicao" label="Nome da Instituição" onChange={this.handleChange('nomeInstituicao')} value={nomeInstituicao} fullWidth />
            { errors.nomeInstituicao &&
              <FormHelperText id="name-error-text" error>{errors.nomeInstituicao}</FormHelperText>
             }
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="nomeCurso" label="Nome do Curso"  onChange={this.handleChange('curso')} value={curso} fullWidth />
            { errors.curso &&
              <FormHelperText id="name-error-text" error>{errors.curso}</FormHelperText>
             }
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value={fera ? "yes": "no"} onChange={this.handleChange('fera')} />}
              label="Sou FERA 2018.2 da Universidade Federal da Paraíba"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  nomeInstituicao: state.userReducer.nomeInstituicao,
  curso: state.userReducer.curso,
  fera: state.userReducer.fera,
  errors: state.userReducer.errors,
});


export default connect(mapStateToProps, { ...CreatorsUser })(EducationForm);