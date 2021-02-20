const specialOffer = (deadline) => {


    const getTime = (offerEnd) => {
        const currentTime = new Date();
        const offerLeft = new Date(offerEnd - currentTime);
        const daysLeft = offerLeft.getDate();
        const hoursLeft = offerLeft.getHours();
        const minutesLeft = offerLeft.getMinutes();
        const secondsLeft = offerLeft.getSeconds();

        return {
            currentTime,
            daysLeft,
            hoursLeft,
            minutesLeft,
            secondsLeft,
        };
    };

    const timerNumbers = (num) => {
        if (num >= 10) {
            return num;
        }
        return `0${num}`;
    };

    const offerOn = (offerDeadline) => {
        const offerEnd = new Date(offerDeadline);
        const days = document.querySelector('#days');
        const hours = document.querySelector('#hours');
        const minutes = document.querySelector('#minutes');
        const seconds = document.querySelector('#seconds');
        let offerTimer;

        const secTimer = () => {
            const { currentTime, daysLeft, hoursLeft, minutesLeft, secondsLeft } = getTime(offerEnd);

            days.textContent = timerNumbers(daysLeft);
            hours.textContent = timerNumbers(hoursLeft);
            minutes.textContent = timerNumbers(minutesLeft);
            seconds.textContent = timerNumbers(secondsLeft);

            if ((offerEnd - currentTime) <= 0) {
                clearInterval(offerTimer);
            }
        };

        if (new Date(offerDeadline) - new Date() > 0) {
            secTimer();
            offerTimer = setInterval(secTimer, 1000);
        } else {
            days.textContent = '--';
            hours.textContent = '--';
            minutes.textContent = '--';
            seconds.textContent = '--';
        }
    };
    offerOn(deadline);
};

export default specialOffer;