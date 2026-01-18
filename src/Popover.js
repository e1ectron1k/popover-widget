export default class Popover {
    constructor(element) {
      this.element = element;
      this.popover = null;
      this.title = element.dataset.title || 'Popover Title';
      this.content = element.dataset.content || 'Popover content';
      this.isVisible = false;
      
      this.init();
    }
  
    init() {
      this.createPopover();
      this.bindEvents();
    }
  
    createPopover() {
      this.popover = document.createElement('div');
      this.popover.className = 'popover';
      
      const arrow = document.createElement('div');
      arrow.className = 'popover-arrow';
      
      const header = document.createElement('div');
      header.className = 'popover-header';
      header.textContent = this.title;
      
      const body = document.createElement('div');
      body.className = 'popover-body';
      body.textContent = this.content;
      
      this.popover.appendChild(arrow);
      this.popover.appendChild(header);
      this.popover.appendChild(body);
      
      document.body.appendChild(this.popover);
    }
  
    bindEvents() {
      this.element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.isVisible) {
          this.hide();
        } else {
          this.show();
        }
      });
  
      document.addEventListener('click', (e) => {
        if (this.isVisible && 
            !this.element.contains(e.target) && 
            !this.popover.contains(e.target)) {
          this.hide();
        }
      });
    }
  
    show() {
      if (this.isVisible) return;
      
      this.popover.classList.add('show');
      this.isVisible = true;
      
      this.updatePosition();
      
      window.addEventListener('resize', this.updatePosition.bind(this));
    }
  
    hide() {
      if (!this.isVisible) return;
      
      this.popover.classList.remove('show');
      this.isVisible = false;
      
      window.removeEventListener('resize', this.updatePosition.bind(this));
    }
  
    updatePosition() {
      const elementRect = this.element.getBoundingClientRect();
      const popoverRect = this.popover.getBoundingClientRect();
      
      const top = elementRect.top - popoverRect.height - 10;
      const left = elementRect.left + (elementRect.width / 2) - (popoverRect.width / 2);
      
      const windowWidth = window.innerWidth;
      let finalLeft = left;
      
      if (finalLeft < 10) {
        finalLeft = 10;
      } else if (finalLeft + popoverRect.width > windowWidth - 10) {
        finalLeft = windowWidth - popoverRect.width - 10;
      }
      
      this.popover.style.top = `${top}px`;
      this.popover.style.left = `${finalLeft}px`;
    }
  
    destroy() {
      this.hide();
      if (this.popover && this.popover.parentNode) {
        this.popover.parentNode.removeChild(this.popover);
      }
      this.element.removeEventListener('click', this.show);
      this.element.removeEventListener('click', this.hide);
    }
  }