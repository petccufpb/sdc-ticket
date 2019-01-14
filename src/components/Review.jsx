import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

import { Creators as CreatorsUser } from '../store/ducks/user';


const products = [
  { name: 'Ingresso - 11/02', desc: 'Palestras, Jogos, Corrida de Rôbos, Jam Session', price: 'Grátis' },
  { name: 'Ingresso - 12/02', desc: 'Palestras, Feira de Laboratórios, Workshop, Cinema', price: 'Grátis' },
  { name: 'Ingresso - 13/02', desc: 'Palestras, Mesas Redondas, Jogos de Tabuleiro, Maratona de Programação', price: 'Grátis' },
  { name: 'Ingresso - 14/02', desc: 'Minicursos', price: 'Grátis' },
  { name: 'Ingresso - 15/02', desc: 'Hackathon', price: 'Grátis' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Review(props) {
  const { classes, nome, sobrenome, email, curso, nomeInstituicao } = props;
  return (
    <React.Fragment>
      <Typography component="h6" variant="p" gutterBottom>
        {'Revise seu pedido'}
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {'R$ 0,00'}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.title} component="h6" variant="p" gutterBottom>
            {'Dados pessoais'}
          </Typography>
          <Typography gutterBottom>{`${nome} ${sobrenome}`}</Typography>
          <Typography gutterBottom>{email}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography className={classes.title} component="h6" variant="p" gutterBottom>
            {'Escolaridade'}
          </Typography>
          <Grid container>
                <Grid item xs={12}>
                  <Typography gutterBottom>{nomeInstituicao}</Typography>
                </Grid>
              
                <Grid item xs={12}>
                  <Typography gutterBottom>{curso}</Typography>
                </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nome: state.userReducer.nome,
  sobrenome: state.userReducer.sobrenome,
  email: state.userReducer.email,
  nomeInstituicao: state.userReducer.nomeInstituicao,
  curso: state.userReducer.curso,
});



export default connect(mapStateToProps, { ...CreatorsUser })(withStyles(styles)(Review));