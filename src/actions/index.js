export const LOGAR = 'LOGAR';

export function logar(email) {
  return {
    type: LOGAR,
    email,
  };
}
