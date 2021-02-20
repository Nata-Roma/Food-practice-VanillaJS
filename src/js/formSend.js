const formSend = () => {
    const statusMessage = {
        loading: '/src/img/form/spinner.svg',
        success: 'Thank you! We will connect to you soon',
        failure: 'Something goes wrong',
    };
    
    const forms = document.querySelectorAll('form');

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

    const postData = (form) => {
        const showSendResponse = (message) => {
            const modalDialog = document.querySelector('.modal__dialog');
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
                restorePagefromModal();
            }, 4000);
        };

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
                    modalView();
                    showSendResponse(statusMessage.success);
                    warningMessage.remove();
                })
                .catch((err) => {
                    console.error(err);
                    modalView();
                    showSendResponse(statusMessage.failure);
                    warningMessage.remove();
                }).finally(() => {
                    form.reset();
                });
        });
    };
    forms.forEach((form) => postData(form));
    
};

module.exports = formSend;