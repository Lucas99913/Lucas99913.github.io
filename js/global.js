let myVar = "my variable";
myVar = "variable changed";

const myVar2 = "my varaible 2";

let isTrue = true;
let isFalse = false;

let chiffre1 = 4;
let chiffre2 = 3;

let test = 'test ' + myVar + 'value';
let test2 = `test ${myVar} dzqdqzd `;

let array = ['item 1', 'item 2', 'item 3', 'item 4'];

let obj = {
  title: 'Mon titre',
  description: 'Ma description'
}

const myFunction = (item, item2) => {
  // console.log(item, item2);
}

myFunction('toto', 5);
myFunction('tata', 6);

const calcul = (nb1, nb2) => {
  return nb1 + nb1;
}

let result = calcul(4, 5);

let div = document.createElement('div');
div.classList.add('top');
div.innerHTML = `<span>Top zone</span>`;

/* Menu mobile */

function menuMobile() {
  const btn = document.querySelector('.burger');
  const header = document.querySelector('.header');
  const links = document.querySelectorAll('.navbar a');

  btn.addEventListener('click', () => {
    header.classList.toggle('show-nav');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('show-nav');
    });
  });
}

menuMobile();

/* Porfolio */

function tabsFilters() {
  const tabs = document.querySelectorAll('.portfolio-filters a');
  const projets = document.querySelectorAll('.portfolio .card');

  const resetActiveLinks = () => {
    tabs.forEach(elem => {
      elem.classList.remove('active');
    })
  }

  const showProjets = (elem) => {
    console.log(elem);
    projets.forEach(projet => {

      let filter = projet.getAttribute('data-category');

      if (elem === 'all') {
        projet.parentNode.classList.remove('hide');
        return
      }

      console.log('tutu');
      filter !== elem ? projet.parentNode.classList.add('hide') : projet.parentNode.classList.remove('hide');

    });
  }

  tabs.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      let filter = elem.getAttribute('data-filter');
      showProjets(filter)
      resetActiveLinks();
      elem.classList.add('active');
    });
  })
}

tabsFilters()

function showProjectDetails() {
  const links = document.querySelectorAll('.card__link');
  const modals = document.querySelectorAll('.modal');
  const btns = document.querySelectorAll('.modal__close');

  const hideModals = () => {
    modals.forEach(modal => {
      modal.classList.remove('show');
    });
  }

  links.forEach(elem => {
    elem.addEventListener('click', (event) => {
      event.preventDefault();

      document.querySelector(`[id=${elem.dataset.id}]`).classList.add('show');
    });
  });

  btns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      hideModals();
    });
  });

}

showProjectDetails();

// effets

const observerIntersectionAnimation = () => {
  const sections = document.querySelectorAll('section');
  const skills = document.querySelectorAll('.skills .bar');

  sections.forEach((section, index) => {
    if (index === 0) return;
    section.style.opacity = "0";
    section.style.transition = "all 1.6s";
  });

  skills.forEach((elem, index) => {

    elem.style.width = "0";
    elem.style.transition = "all 1.6s";
  });

  let sectionObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.opacity = 1;
      }
    });
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  let skillsObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let elem = entry.target;
        elem.style.width = elem.dataset.width + '%';
      }
    });
  });

  skills.forEach(skill => {
    skillsObserver.observe(skill);
  });
}

observerIntersectionAnimation();

/**
 * Calcul la position de l'élément par rapport au haut de la page
 * @param {HTMLElement} element
 * @returns {number}
 */

function offsetTop(element, acc = 0) {
  if (element.offsetParent) {
    return offsetTop(element.offsetParent, acc + element.offsetTop);
  }
  return acc + element.offsetTop;
}

class Parallax {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
    this.ratio = parseFloat(element.dataset.parallax);
    this.onScroll = this.onScroll.bind(this);
    this.onIntersection = this.onIntersection.bind(this);
    this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
    const observer = new IntersectionObserver(this.onIntersection)
    observer.observe(element)
    document.addEventListener('scroll', this.onScroll)
    this.onScroll();
  }

  /**
   * @param {IntersectionObserverEntry[]} entries
  */

  onIntersection(entries) {
    for (const entry of entries) {
      if (element.isIntersecting) {
        document.addEventListener('scroll', this.onScroll);
      } else {
        document.removeEventListener('scroll', this.onScroll);
      }
    }
  }

  onScroll() {
    window.requestAnimationFrame(() => {
      this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
      const screenY = window.scrollY + window.innerHeight / 2;
      const diffY = this.elementY - screenY;
      this.element.style.setProperty('transform', `translateY(${diffY * -1 * this.ratio}px)`)
    })
  }

  /**
   *
   * @returns {Parallax[]}
   */
  static bind() {
    return Array.from(document.querySelectorAll('[data-parallax]')).map((element) => {
      return new Parallax(element);
    })
  }
}

Parallax.bind();