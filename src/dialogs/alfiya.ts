import { DialogSequence } from './types';

export const alfiyaDialog: DialogSequence = [
  { id: 'b1', text: 'init_connection()', delayBefore: 500, typingSpeed: 30 },
  { id: 'b2', text: 'Соединение установлено.', delayBefore: 1000, typingSpeed: 30 },
  { id: 'b3', text: 'Привет. Логи сервера говорят, что ты наконец-то здесь.', delayBefore: 1500 },
  { id: 'b4', text: 'В системе есть уязвимости. 20 штук, если быть точным.', delayBefore: 2000 },
  { id: 'b5', text: 'Начинай поиск. Доступ к терминалу открыт.', delayBefore: 1000 },
];
