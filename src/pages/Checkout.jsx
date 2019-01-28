import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as jsPDF from 'jspdf';
import QRious from 'qrious';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as firebase from 'firebase';
import { withSnackbar } from 'notistack';

import { Creators as CreatorsUser } from '../store/ducks/user';
import { PersonalForm, EducationForm, Review } from '../components';
// -- imagens
import LogoSdcBranca from '../assets/logo-sem-fundo-branca.png';
import { IngressoDia1, IngressoDia2, IngressoDia3, IngressoDia4, IngressoDia5 }  from '../assets/IngressosBase64';


const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: blue,
    secondary: pink
  },
});

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 40,
    height: 45,
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
});

const steps = ['Dados pessoais', 'Escolaridade', 'Revise seu pedido'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalForm />;
    case 1:
      return <EducationForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

// schemas para validacao
const nomeSchema = Yup
  .string()
  .required('Nome é obrigatório')
  .min(3, 'Nome deve conter no mínimo 3 caracteres')

const sobreNomeSchema = Yup
  .string()
  .required('Sobrenome é obrigatório')
  .min(3, 'Nome deve conter no mínimo 3 caracteres')

const emailSchema = Yup.string()
  .email('E-mail inválido')
  .required('E-mail é obrigatório')

const senhaSchema = Yup.string()
    .required('Senha é obrigatório')
    .min(8, 'Sua senha deve conter no mínimo 8 dígitos')
    .matches(/^\d+$/, 'Sua senha deve conter apenas dígitos')

const nomeInstituicaoSchema = Yup.string()
.required('Nome da Instituição é obrigatório')
.min(3, 'Nome da Instituição deve conter no mínimo 3 caracteres')

const cursoSchema =  Yup.string()
  .required('Curso é obrigatório')
  .min(3, 'Curso deve conter no mínimo 3 caracteres')

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    loading: false,
  };

  async validateNomeSchema() {
    const self = this;
    return nomeSchema.validate(this.props.nome).then(() => true).catch(function(err) {
      self.props.setErrors({ nome: err.errors[0] });
      //--
      return false
    }); 
  }

  async validateSobreNomeSchema() {
    const self = this;
    return sobreNomeSchema.validate(this.props.sobrenome).then(() => true).catch(function(err) {
      self.props.setErrors({ sobrenome: err.errors[0] });
      //--
      return false
    }); 
  }

  async validateEmailSchema() {
    const self = this;
    return emailSchema.validate(this.props.email).then(() => true).catch(function(err) {
      self.props.setErrors({ email: err.errors[0] });
      //--
      return false
    }); 
  }

  async validateSenhaSchema() {
    const self = this;
    return senhaSchema.validate(this.props.senha).then(() => true).catch(function(err) {
      self.props.setErrors({ senha: err.errors[0] });
      //--
      return false
    }); 
  }

  async validateNomeInstituicaoSchema() {
    const self = this;
    return nomeInstituicaoSchema.validate(this.props.nomeInstituicao).then(() => true).catch(function(err) {
      self.props.setErrors({ nomeInstituicao: err.errors[0] });
      //--
      return false
    }); 
  }

  async validateCursoSchema() {
    const self = this;
    return cursoSchema.validate(this.props.curso).then(() => true).catch(function(err) {
      self.props.setErrors({ curso: err.errors[0] });
      //--
      return false
    }); 
  }

  generateQrCode(id, dia) {
    const qr = new QRious({
      value: id.concat('@dia').concat(dia),
      size: 200
    });
    return qr.toDataURL();
  }


  handleNext = async() => {
    if (this.state.activeStep === 0) {
      const _1 = await this.validateNomeSchema();
      const _2 = await this.validateSobreNomeSchema();
      const _3 = await this.validateEmailSchema();
      const _4 = await this.validateSenhaSchema();

      if (_1 && _2 && _3 && _4) {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      }
    }
    else if (this.state.activeStep === 1) {
      //--
      const _5 = await this.validateCursoSchema();
      const _6 = await this.validateNomeInstituicaoSchema();

      if (_5 && _6) {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      }
    }
    else {
      this.setState({ loading: true });
      //--
      const id = await this.writeUserFirebase();

      if (id) {
        await this.generateTicket(id);

        this.setState(state => ({
          activeStep: state.activeStep + 1, loading: false,
        }));
      }
    }
  };

   // retorna o codigo qrcode id_do_usuario
   async writeUserFirebase() {
    const { nome, sobrenome, nomeInstituicao, curso, email, senha, fera } = this.props;
    //--
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, senha);
      const uid = firebase.auth().currentUser.uid;
      const nomeCompleto = `${nome} ${sobrenome}`;
       // --
      await firebase.database()
        .ref('v2/usuarios/'.concat(uid))
        .set({ 
          id: uid, 
          nome: nomeCompleto,
          nomeInstituicao,
          curso,
          email,
          fera: fera==='yes',
          modo: 'web' });
      return uid;
    } catch (e) {
      this.props.enqueueSnackbar(String(e), { variant: 'error', autoHideDuration: 4000 });
      //--
      this.setState({ activeStep: 0, loading: false });
    }
  }

  async generateTicket(id) {
    const doc = new jsPDF('p', 'pt', 'a4');
    //--
    doc.addImage(IngressoDia1, 'PNG', 0, 0, 595, 151);
    doc.addImage(this.generateQrCode(id, '1'), 'PNG', 235, 26, 84, 84);

    doc.addImage(IngressoDia2, 'PNG', 0, 160, 595, 151);
    doc.addImage(this.generateQrCode(id, '2'), 'PNG', 235, 160+26, 84, 84);
    
    doc.addImage(IngressoDia3, 'PNG', 0, 2*160, 595, 151);
    doc.addImage(this.generateQrCode(id, '3'), 'PNG', 235, 2*160+26, 84, 84);
    
    doc.addImage(IngressoDia4, 'PNG', 0, 3*160, 595, 151);
    doc.addImage(this.generateQrCode(id, '4'), 'PNG', 235, 3*160+26, 84, 84);
    
    doc.addImage(IngressoDia5, 'PNG', 0, 4*160, 595, 151);
    doc.addImage(this.generateQrCode(id, '5'), 'PNG', 235, 4*160+26, 84, 84);

    doc.save('ingressos.pdf', { returnPromise: true });
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
              <div className={classes.row}>
                <img
                  alt="Adelle Charles"
                  src={LogoSdcBranca}
                  className={classNames(classes.avatar, classes.bigAvatar)}
                />
                <div className={classes.column}>
                  <Typography variant="caption" color="inherit">
                    <strong>{'Semana da Computação'}</strong>
                  </Typography>
                  <Typography variant="caption" color="inherit">
                    {'Centro de Informática - R. dos Escoteiros, s/n - Mangabeira, João Pessoa - PB'}
                  </Typography>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="p" align="center">
                {'Ticket'}
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      {'Agradecemos sua inscrição.'}
                    </Typography>
                    <Typography variant="subtitle1">
                      {'Compareça no dia do evento portando seu ticket. Você poderá logar no aplicativo do evento, disponível apenas para plataforma Android, com e-mail e senha cadastrados aqui.'}
                    </Typography>
                    {/* <Typography variant="subtitle1">
                      {''}
                    </Typography> */}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                    { this.state.loading ?
                      (
                        <div className={classes.loading}>
                          <CircularProgress size={50} className={classes.progress} />
                        </div>
                      )
                      :
                      (
                        <div>
                          {activeStep !== 0 && (
                          <Button onClick={this.handleBack} className={classes.button}>
                            Voltar
                          </Button>
                        )}
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            {activeStep === steps.length - 1 ? 'Finalizar Pedido' : 'Próximo'}
                          </Button>
                        </div>
                      )
                    }
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  nome: state.userReducer.nome,
  sobrenome: state.userReducer.sobrenome,
  senha: state.userReducer.senha,
  email: state.userReducer.email,
  nomeInstituicao: state.userReducer.nomeInstituicao,
  curso: state.userReducer.curso,
  fera: state.userReducer.fera,
});

export default connect(mapStateToProps, { ...CreatorsUser })(withSnackbar((withStyles(styles)(Checkout))));