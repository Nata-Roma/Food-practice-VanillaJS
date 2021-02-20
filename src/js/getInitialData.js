import cards from './cards';

const getInitialData = () => {

    const getDataFromServer = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        return await response.json();
    };

    getDataFromServer('http://localhost:3000/menu')
        .then((data) => {
            const cardContent = [...data];
            console.log(data);
            cards(cardContent);
        }).catch((err) => {
            console.error('Card content could not be downloaded ', err);
        });
        
};

export default getInitialData;