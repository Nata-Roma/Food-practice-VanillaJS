const connectUs = document.querySelectorAll('[data-modal]');

export const modalView = (modal) => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
};

export const restorePagefromModal = (modal) => {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

const modalWindow = ({modalBox}) => {
    const modal = document.querySelector(modalBox);

    const handleModalClose = (e) => {
        if (e.target === modal || e.target.hasAttribute('data-close') || e.key === 'Escape' || e.key === 'Esc') {
            restorePagefromModal(modal);
        }
    };
    const modalAsPageBottom = () => {
        const scrollMax = document.documentElement.scrollHeight;
        const scrollCurrent = window.pageYOffset + document.documentElement.clientHeight;
        if (scrollCurrent >= scrollMax) {
            modalView(modal);
            window.removeEventListener('scroll', modalAsPageBottom);
        }
    };

    connectUs.forEach((button) => {
        button.addEventListener('click', () => modalView(modal));
    });

    modal.addEventListener('click', (e) => handleModalClose(e));
    document.addEventListener('keyup', (e) => handleModalClose(e));
    window.addEventListener('scroll', modalAsPageBottom);

};

export default modalWindow;

