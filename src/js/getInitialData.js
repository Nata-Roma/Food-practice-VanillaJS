import cards from './cards';

const getInitialData = ({cardsContainer, url}) => {

    const getDataFromServer = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }
        return await response.json();
    };

    getDataFromServer(url)
        .then((data) => {
            const cardContent = [...data];
            console.log(data);
            cards(cardContent, cardsContainer);
        }).catch((err) => {
            console.error('Card content could not be downloaded ', err);
        });
};

export default getInitialData;
