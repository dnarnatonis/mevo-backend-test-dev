/* eslint-disable prettier/prettier */
import { object, string, number } from 'yup';

// Valores Negativos: Operações com valores negativos são consideradas inválidas.
// Operações Duplicadas: Uma operação é duplicada se existir outra operação no arquivo com os mesmos valores de to, from, e amount. Tais operações são consideradas inválidas.
// Valores Suspeitos: Operações com valores acima de R$50.000,00 são marcadas como suspeitas, mas ainda válidas para inclusão no banco de dados.
// Os Valores estão em centavos, desta forma 100 = R$1

export const OPERATION_FILE_SCHEMA = object({
  from: string().length(13).required(),
  to: string().length(13).required(),
  amount: number().positive().required(),
});