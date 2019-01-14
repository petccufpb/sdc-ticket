import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class EducationForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Typography component="h6" variant="p" gutterBottom>
          {'Escolaridade'}
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <TextField required id="nomeInstituicao" label="Nome da Instituição" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required id="nomeCurso" label="Nome do Curso" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label="Sou FERA 2018.2 da Universidade Federal da Paraíba"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default EducationForm;