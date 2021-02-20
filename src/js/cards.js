const cards = (cardContent) => {
    const cardContainer = document.querySelector('.menu__field .container');

    class CardRender {
        constructor({ title, image, alt, description, price }, parent) {
            this.title = title;
            this.image = image;
            this.alt = alt;
            this.description = description;
            this.price = price;
            this.parent = parent;
            this.currencyRate = 27;
            this.changeCurrency();
        }
        changeCurrency() {
            this.price = Math.floor((this.currencyRate * this.price));
        }
        cardRender() {
            const element = document.createElement('div');
            element.classList.add("menu__item");

            element.innerHTML = `
                    <img src=${this.image} alt=${this.alt}}>
                    <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    const cardRenderBlock = (cardContent) => {

        for (let i = 0; i < 3; i++) {
            new CardRender(cardContent[i], cardContainer).cardRender();
        }
    };
    cardRenderBlock(cardContent);
};

module.exports = cards;
