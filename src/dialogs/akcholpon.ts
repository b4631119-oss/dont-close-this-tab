import { DialogSequence } from './types';

export const akcholponDialog: DialogSequence = [
  { id: 'a1', text: 'О, привет.', delayBefore: 1000 },
  { id: 'a2', text: 'Я ждал, пока ты откроешь эту вкладку.', delayBefore: 1500 },
  { id: 'a3', text: 'Этот интерфейс кажется пустым, но это не так.', delayBefore: 1000 },
  { id: 'a4', text: 'Здесь спрятано 20 тайн.', delayBefore: 1500 },
  { id: 'a5', text: 'Попробуй осмотреться. Обрати внимание на детали.', delayBefore: 1000 },
];
