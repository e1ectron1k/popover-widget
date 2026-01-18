import Popover from '../src/Popover.js';

describe('Popover Widget', () => {
  let button;
  let popover;

  beforeEach(() => {

    button = document.createElement('button');
    button.dataset.title = 'Test Title';
    button.dataset.content = 'Test Content';
    button.textContent = 'Test Button';
    document.body.appendChild(button);

    popover = new Popover(button);
  });

  afterEach(() => {
    if (popover) {
      popover.destroy();
    }
    if (button && button.parentNode) {
      button.parentNode.removeChild(button);
    }
  });

  test('should create popover element', () => {
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement).not.toBeNull();
    expect(popoverElement.classList.contains('popover')).toBe(true);
  });

  test('should show popover on button click', () => {
    button.click();
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement.classList.contains('show')).toBe(true);
    expect(popover.isVisible).toBe(true);
  });

  test('should hide popover on second click', () => {
    button.click();
    button.click();
    
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement.classList.contains('show')).toBe(false);
    expect(popover.isVisible).toBe(false);
  });

  test('should contain correct title and content', () => {
    const popoverElement = document.querySelector('.popover');
    const title = popoverElement.querySelector('.popover-header');
    const content = popoverElement.querySelector('.popover-body');
    
    expect(title.textContent).toBe('Test Title');
    expect(content.textContent).toBe('Test Content');
  });

  test('should hide popover when clicking outside', () => {
    button.click();
    
    document.body.click();
    
    expect(popover.isVisible).toBe(false);
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement.classList.contains('show')).toBe(false);
  });

  test('should destroy popover correctly', () => {
    popover.destroy();
    
    const popoverElement = document.querySelector('.popover');
    expect(popoverElement).toBeNull();
    expect(popover.isVisible).toBe(false);
  });
});