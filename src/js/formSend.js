import { restorePagefromModal, modalView } from './modal';
import {statusMessage} from './initialData';

const showSendResponse = (message, modal, modalInnerBox) => {
    const modalDialog = document.querySelector(modalInnerBox);
    modalDialog.classList.add('hide');
    const thanksDialog = document.createElement('div');
    thanksDialog.classList.add('modal__dialog');
    thanksDialog.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    modal.append(thanksDialog);
    setTimeout(() => {
        thanksDialog.remove();
        modalDialog.classList.remove('hide');
        restorePagefromModal(modal);
    }, 4000);
};

const formSend = ({modalBox, formContainer, modalInner}) => {
    const modal = document.querySelector(modalBox);
    const forms = document.querySelectorAll(formContainer);

    const postDataToServer = async (url, data) => {
        // !!! Do not declare headers if FormData using
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: data
        });

        return await response.json();
    };

    const postData = (form, modalInnerBox) => {

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const warningMessage = document.createElement('img');
            warningMessage.src = statusMessage.loading;
            warningMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', warningMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postDataToServer('http://localhost:3000/requests', json)
                .then((data) => {
                    console.log(data);
                    modalView(modal);
                    showSendResponse(statusMessage.success, modal, modalInnerBox);
                    warningMessage.remove();
                })
                .catch((err) => {
                    console.error(err);
                    modalView(modal);
                    showSendResponse(statusMessage.failure, modal, modalInnerBox);
                    warningMessage.remove();
                }).finally(() => {
                    form.reset();
                });
        });
    };
    forms.forEach((form) => postData(form, modalInner));
};

export default formSend;
