const linkClass = "pagination__button";
const linkCurrentClass = "pagination__button--current";

const getCardTemplate = (data) => {
  const { img, alt, title, article, price, rating } = data;

  return `<li class="catalog__item">
      <article class="top-rated-card">
        <div class="top-rated-card__img-wrapper">
          <picture>
            <source srcset="img/top-rated/${img}.webp 1x, img/top-rated/${img}@2x.webp 2x" type="image/webp">
            <img class="top-rated-card__img" src="img/top-rated/${img}.png" srcset="img/top-rated/${img}@2x.png 2x" loading="lazy" alt="${alt}">
          </picture>
        </div>

        <div class="top-rated-card__info">
          <h3 class="top-rated-card__title">
            <span>${title}</span>
            <span>${article}</span>
          </h3>

          <p class="top-rated-card__price">
            <span class="visually-hidden">Цена товара: </span>
            ${price}
          </p>

          <a class="top-rated-card__buy-btn btn-secondary" href="product.html">Купить</a>
        </div>

        <p class="top-rated-card__rating">
          <svg class="top-rated-card__icon" width="13" height="12" aria-hidden="true">
            <use xlink:href="img/icons/sprite.svg#icon-star"></use>
          </svg>
          <span class="visually-hidden">Рейтинг товара: </span>
          ${rating}
        </p>
      </article>
    </li>`;
};

const getPaginationItemTemplate = (pageNum, currentPage) => {
  const itemClass =
    pageNum === currentPage ? `${linkClass} ${linkCurrentClass}` : linkClass;

  return `<li class="pagination__item">
    <button class="${itemClass}" type="button" data-page=${pageNum}>${pageNum}</button>
  </li>`;
};

const createElement = (template) => {
  const newElement = document.createElement("div");
  newElement.innerHTML = template;

  return newElement.firstChild;
};

class Pagination {
  constructor(options) {
    const { page, container, pagination, data, elementsSetup } = options;

    this.page = document.querySelector(page);
    this.container = document.querySelector(container);
    this.pagination = document.querySelector(pagination);
    this.data = data;
    this.elementsSetup = elementsSetup;
    this.totalPages = 0;
    this.currentPage = 0;
    this.elementsOnPage = 0;
    this.breakpoint = elementsSetup.breakpoint;
  }

  setScreenSizeHandler() {
    const mediaQueryList = window.matchMedia(
      `(min-width: ${this.breakpoint}px)`
    );

    const screenSizeChangeHandler = (mql) => {
      if (mql.matches) {
        this.elementsOnPage = this.elementsSetup.max;
      } else {
        this.elementsOnPage = this.elementsSetup.min;
      }

      this.renderPage();
    };

    mediaQueryList.addEventListener("change", screenSizeChangeHandler);
  }

  setCurrentPage(pageNum) {
    if (pageNum === this.currentPage) {
      return;
    }

    this.currentPage = pageNum;
    const paginationItems = this.pagination.querySelectorAll("BUTTON");

    paginationItems.forEach((el) => {
      el.classList.remove(linkCurrentClass);

      if (Number(el.dataset.page) === this.currentPage) {
        el.classList.add(linkCurrentClass);
      }
    });

    this.renderElements();
  }

  setPaginationlisteners() {
    const paginationClickHandler = (evt) => {
      if (evt.target.tagName === "BUTTON") {
        this.setCurrentPage(Number(evt.target.dataset.page));
      }
    };

    const paginationKeyHandler = (evt) => {
      if (
        evt.target.tagName === "BUTTON" &&
        (evt.code === "Space" || evt.key === " " || evt.key === "Spacebar")
      ) {
        this.setCurrentPage(Number(evt.target.dataset.page));
      }
    };

    this.pagination.removeEventListener("click", paginationClickHandler);
    this.pagination.removeEventListener("keydown", paginationKeyHandler);

    this.pagination.addEventListener("click", paginationClickHandler);
    this.pagination.addEventListener("keydown", paginationKeyHandler);
  }

  renderPagination() {
    if (this.totalPages <= 1) {
      this.pagination.parentElement.remove();
      return;
    }

    this.pagination.innerHTML = "";

    const paginationItemsTemplates = [];

    for (let i = 1; i <= this.totalPages; i++) {
      const template = getPaginationItemTemplate(i, this.currentPage);

      paginationItemsTemplates.push(template);
    }

    const fragment = new DocumentFragment();

    paginationItemsTemplates.forEach((template) => {
      const el = createElement(template);
      fragment.append(el);
    });

    this.pagination.append(fragment);

    this.setPaginationlisteners();
  }

  renderElements() {
    this.totalPages = Math.ceil(this.data.length / this.elementsOnPage);
    this.container.innerHTML = "";

    const lastIdx = this.currentPage * this.elementsOnPage;
    const startIdx = lastIdx - this.elementsOnPage;

    const dataToShow = this.data.slice(startIdx, lastIdx);

    const elementToShowTemplates = dataToShow.map((item) => {
      return getCardTemplate(item);
    });

    const fragment = new DocumentFragment();

    elementToShowTemplates.forEach((template) => {
      const el = createElement(template);
      fragment.append(el);
    });

    this.container.append(fragment);
  }

  renderPage() {
    this.currentPage = 1;
    this.renderElements();
    this.renderPagination();
  }

  init() {
    if (!this.page || !this.container) {
      return;
    }

    if (window.innerWidth >= this.breakpoint) {
      this.elementsOnPage = this.elementsSetup.max;
    } else {
      this.elementsOnPage = this.elementsSetup.min;
    }

    this.renderPage();

    this.setScreenSizeHandler();
  }
}

export default Pagination;
