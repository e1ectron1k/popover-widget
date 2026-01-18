import './styles/main.css';
import Popover from './Popover.js';

document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll('[data-title][data-content]');
  
  buttons.forEach(button => {
    new Popover(button);
  });
  
  console.log('Popover widget initialized');
});