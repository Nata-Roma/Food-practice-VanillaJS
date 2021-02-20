import { tabContent } from './initialData';

const tabs = ({contentContainer, tabContainer, tabs}) => {

    const contentWrapper = document.querySelectorAll(contentContainer);
    const tabWrapper = document.querySelector(tabContainer);
    const tabItems = tabWrapper.querySelectorAll(tabs);

    // Tabs, Content, Choise of style
    const handleContentHide = (element) => {
        element.classList.add('hide');
        element.classList.remove('show', 'fade');
    };

    const handleContentShow = (element) => {
        element.classList.add('show', 'fade');
        element.classList.remove('hide');
    };

    const handleTabContent = ({ image, description }, parent) => {
        const imageElem = parent.querySelector('img');
        const descriptionElem = parent.querySelector('.tabcontent__descr');
        handleContentHide(parent);

        imageElem.src = image;
        descriptionElem.textContent = description;
        handleContentShow(parent);
    };

    const handleTabClick = (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabItems.forEach((tab) => {
                tab.classList.remove('tabheader__item_active');
            });
            tabItems.forEach((tab, i) => {
                if (target === tab) {
                    target.classList.add('tabheader__item_active');
                    contentWrapper.forEach((item) => {
                        handleContentHide(item);
                    });
                    handleTabContent(tabContent[i], contentWrapper[i]);
                }
            });
        }
    };
    tabWrapper.addEventListener('click', (e) => handleTabClick(e));
    contentWrapper.forEach((item) => {
        handleContentHide(item);
    });
    handleTabContent(tabContent[0], contentWrapper[0]);
};

export default tabs;
