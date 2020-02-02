import './style.scss';

const math = {
  lerp: (a, b, n) => (1 - n) * a + n * b,
  norm: (value, min, max) => {
    return (value - min) / (max - min)
  },
  map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
};

const config = {
  height: window.innerHeight,
  width: window.innerWidth
}

class Item {
  constructor(element) {
    this.element = element;
    this.image = element.querySelector('.item__content');
    this.imageWrapper = element.querySelector('.item__wrapper');
    this.lastProgress = null;

    this.overflow = parseInt(getComputedStyle(this.image).getPropertyValue('--overflow'), 10);

    this.boundingRect;
    this.fromDirection = element.dataset.from || 'left';
    this.resize();
  }
  resize() {
    this.boundingRect = this.element.getBoundingClientRect();
    const imageWrapperRect = this.imageWrapper && this.imageWrapper.getBoundingClientRect();

    this.height = imageWrapperRect ? imageWrapperRect.height : this.boundingRect.height;
    this.width = imageWrapperRect ? imageWrapperRect.width : this.boundingRect.width;
    this.offsetY = this.boundingRect.top + window.scrollY;
  }
  render(scrollY, winsize) {
    const maxValue = 1;
    const minValue = 0;
    const map = (scrollY - this.offsetY) / winsize.height + 1;
    const progress = Math.max(
      Math.min(
        map,
        maxValue,
      ), 
      minValue,
    );
    if (progress <= 0 || progress > 1 || progress < this.lastProgress) return;
    this.lastProgress = progress;

    const progress2 = Math.min(
      progress * 10/7,
      maxValue,
    );
    this.image.style.opacity = progress2;
    if (this.fromDirection === 'bottom') {
      const progress3 = Math.min(
        progress * 10/4,
        maxValue,
      );
      const translateX = 0;
      const translateY = (1 - progress3) * (this.overflow);
      const scale = 0.95 + (0.05 * progress3);

      this.image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
      this.image.style.scale = scale;
    } else {
      const translateX =  (this.fromDirection === 'left' ? 1 : -1) * ((progress * 0.8 + 0.2) - 1) * this.width; // 0.4 - 1
      const translateY = progress * (this.overflow);
      
      this.image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    }
  }
}

let lastTick = Date.now();

class Smooth {
  constructor() {
    this.bindMethods()

    this.data = {
      ease: 0.05,
      current: 0,
      last: 0,
      which: 0,
      lastSkew: null,
      lastNavProgress: null,
    };

    this.sectionPositions = [];

    this.dom = {
      el: document.querySelector('[data-scroll]'),
      content: document.querySelector('[data-scroll-content]'),
      navBackground: document.querySelector('.nav__background'),
      contactImage: document.querySelector('.contact__image'),
    }

    this.items = [];

    this.dom.content.querySelectorAll('.item').forEach(item => this.items.push(new Item(item)));

    this.rAF = null

    this.winsize;

    setTimeout(() => this.init(), 150);
  }

  bindMethods() {
  ['scroll', 'run', 'resize']
  .forEach((fn) => this[fn] = this[fn].bind(this))
  }

  setStyles() {
    Object.assign(this.dom.el.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
    });
  }

  setHeight() {
    document.body.style.height = `${this.dom.content.offsetHeight}px`;
  }

  scroll() {
    this.data.current = window.scrollY
  }

  setActiveLink(which) {
    if (this.dom.el.querySelectorAll('.nav a')[this.data.which]) {
      this.dom.el.querySelectorAll('.nav a')[this.data.which].classList.remove('active');
    }
    this.data.which = which;
    if (this.dom.el.querySelectorAll('.nav a')[which]) {
      this.dom.el.querySelectorAll('.nav a')[which].classList.add('active');
    }
  }

  run() {
    const now = Date.now();

    if (now - lastTick > 6) {
      lastTick = now;

      this.data.last = math.lerp(this.data.last, this.data.current, this.data.ease)
      if (this.data.last < .1) {
        this.data.last = 0
      }

      const navProgress = Math.min((this.data.last / this.winsize.height) * 4, 1); // between 1.0 - 1.2 * winSizeHeight
      
      if (navProgress < 1 || !this.data.lastNavProgress || this.data.lastNavProgress < 1) {
        this.data.lastNavProgress = navProgress;
        this.dom.navBackground.style.transform = `translate3d(0px,${(1-navProgress) * 58}px,0px)`
      }

      const diff = this.data.current - this.data.last;
      const acc = diff / config.width;
      const velo =+ acc;
      let skew = velo * 7.5;
      skew = Math.min(Math.max(-20, skew), 20);

      if (skew !== 0 || this.data.lastSkew !== 0) {
        this.dom.content.style.transform = `translate3d(0, -${this.data.last}px, 0) skewY(${skew}deg)`
    
        this.items.forEach((item, i) => item.render(this.data.last, this.winsize));

        const which = this.sectionPositions.findIndex(pos => pos >= (this.data.current + this.winsize.height / 2));

        if (which !== this.data.which) {
          this.setActiveLink(which);
        }
      }
    }

    this.requestAnimationFrame();
  }

  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.run)
  }

  resize() {
    this.scroll();
    this.setHeight();
    this.calcWinsize();
    this.calcSectionPosition();
    this.items.forEach(item => item.resize());
  }

  addEvents() {
    window.addEventListener('resize', this.resize, { passive: true })
    window.addEventListener('scroll', this.scroll, { passive: true })
  }

  removeEvents() {
    window.removeEventListener('resize', this.resize, { passive: true })
    window.removeEventListener('scroll', this.scroll, { passive: true })
  }

  calcWinsize(){
    let boundingRect = this.dom.el.getBoundingClientRect();

    this.winsize = {
      width: boundingRect.width, 
      height: boundingRect.height,
    };
  }

  calcSectionPosition() {
    this.sectionPositions = [];
    const sections = this.dom.content.querySelectorAll('section');
    const correction = -sections[0].getBoundingClientRect().top;
    let boundingRect;

    for (let i = 1; i < (sections.length - 1); i++) {
      boundingRect = sections[i].getBoundingClientRect();
      this.sectionPositions.push(boundingRect.top + correction);
    }
    let projectsPosition = boundingRect.top + correction + boundingRect.height;
    boundingRect = sections[sections.length - 1].getBoundingClientRect();
    projectsPosition += boundingRect.height;

    this.sectionPositions.push(projectsPosition);
  }

  init() {
    this.setHeight();
    this.setStyles();
    window.scroll(window.scrollX, 0);
    this.data.current = 0;
    this.addEvents();
    this.calcWinsize();
    this.calcSectionPosition();
    this.data.last = this.data.current; // don't animate for the first time
    this.items.forEach(item => item.render(0, this.winsize));
    this.run();

    this.dom.el.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', (e) => {
      const el = document.querySelector(e.target.hash);
      const boundingRect = el.getBoundingClientRect();
      const containerBoundingRect = this.dom.content.getBoundingClientRect();
      const scrollToY = boundingRect.top - containerBoundingRect.top;
      this.data.current = scrollToY
      window.scroll(window.scrollX, scrollToY);
      e.preventDefault();
      e.stopPropagation();
    }));
  }
}

new Smooth();
