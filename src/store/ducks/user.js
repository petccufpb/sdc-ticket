
const Types = {
  SET_DADOS_FORMULARIO: 'SET_DADOS_FORMULARIO',
  SET_ERRORS: 'SET_ERRORS',
};

const INITIAL_STATE_DEV = {
  nome: 'Marcos',
  sobrenome: 'Henrique',
  email: 'alves.henrique.marcos@gmail.com',
  senha: '12345678',
  nomeInstituicao: 'Universidade Federal da Paraíba',
  curso: 'Ciência da Computação',
  fera: false,
  errors: {}
};

const INITIAL_STATE = {
  nome: '',
  sobrenome: '',
  email: '',
  senha: '',
  nomeInstituicao: '',
  curso: '',
  fera: false,
  errors: {}
};

export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case Types.SET_DADOS_FORMULARIO:
      return { ...state, ...action.payload };
    case Types.SET_ERRORS:
      return { ...state, errors: { ...state.errors, ...action.payload } };
    default:
      return state;
  }
};

export function setDadosFormulario(dados) {
  return { type: Types.SET_DADOS_FORMULARIO, payload: dados };
}

export function setErrors(errors) {
  return { type: Types.SET_ERRORS, payload: errors };
};

export const Creators = {
  setDadosFormulario,
  setErrors,
};