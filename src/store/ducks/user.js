
const Types = {
  SET_DADOS_PESSOAIS: 'SET_DADOS_PESSOAIS',
  SET_DADOS_ESCOLARIDADE: 'SET_DADOS_ESCOLARIDADE',
};

const INITIAL_STATE = {
  nome: '',
  sobrenome: '',
  nomeInstituicao: '',
  curso: '',
  fera: false,
};

export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case Types.SET_DADOS_PESSOAIS:
      return { ...state, nome: action.payload.nome, sobrenome: action.payload.sobrenome };
    case Types.SET_DADOS_ESCOLARIDADE:
      return { ...state, nomeInstituicao: action.payload.nomeInstituicao, curso: action.payload.curso, fera: action.payload.fera };
    default:
      return state;
  }
};

export function setDadosPessoais(dados) {
  return { type: Types.SET_DADOS_PESSOAIS, payload: dados };
}

export function setEscolaridade(dados) {
  return { type: Types.SET_DADOS_ESCOLARIDADE, payload: dados };
}

export const Creators = {
  setDadosPessoais,
  setEscolaridade,
};