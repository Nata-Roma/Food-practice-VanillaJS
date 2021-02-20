const caloriesCaclulator = ({
        totalLine, buttonGender, buttonActivity, inputWeight, inputHeight, inputAge
    }) => {
        
    let total = document.querySelector(totalLine);

    let activity;
    let gender;
    let weight;
    let height;
    let age;
    let totalValue;

    const dataCalc = JSON.parse(localStorage.getItem(('dataCalc')));

    if (dataCalc && dataCalc.gender) {
        gender = dataCalc.gender;
    } else {
        gender = 'female';
    }
    if (dataCalc && dataCalc.activity) {
        activity = dataCalc.activity;
    } else {
        activity = 1.375;
    }

    localStorage.setItem('dataCalc', JSON.stringify({gender, activity}));

    total.textContent = '____';

    const dailyCaloriesCalc = () => {
        if (!activity || !gender || !weight || !height || !age) {
            total.textContent = '____';
            return;
        }
        if (gender === 'male') {
            const bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
            totalValue = Math.round(bmr * activity);
        }
        if (gender === 'female') {
            const bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
            totalValue = Math.round(bmr * activity);
        }
        total.textContent = totalValue;
    };

    const buttosFields = (parent) => {
        const elements = parent.querySelectorAll('div');
        elements.forEach((element) => {
                if(element.dataset.gender === gender) {
                    element.classList.add('calculating__choose-item_active');
                }
                if(+element.dataset.activity === activity) {
                    element.classList.add('calculating__choose-item_active');
                }
        });

        parent.addEventListener('click', (e) => {
            if (e.target.hasAttribute(`data-gender`)) {
                gender = e.target.getAttribute('data-gender');
            } else {
                activity = +e.target.getAttribute('data-activity');
            }
            localStorage.setItem('dataCalc', JSON.stringify({gender, activity}));
            if(e.target !== parent) {
                elements.forEach((element) => {
                    element.classList.remove('calculating__choose-item_active');
                });
                e.target.classList.add('calculating__choose-item_active');
            }
                dailyCaloriesCalc();
        });
    };

    const inputFields = (selector) => {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'weight':
                    weight = +input.value;
                    break;
                case 'height':
                    height = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
                dailyCaloriesCalc();
        });
    };

    buttosFields(document.querySelector(buttonGender));
    buttosFields(document.querySelector(buttonActivity));
    
    inputFields(inputWeight);
    inputFields(inputHeight);
    inputFields(inputAge);
};

export default caloriesCaclulator;