console.log('%c HI', 'color: firebrick');

document.addEventListener('DOMContentLoaded', e => {
    // Fetch 4 random dog pictures
    const divImages = document.getElementById('dog-image-container');
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(data => {
        //console.log(data);
        data.message.forEach(elem => {
            // console.log(elem);
            const imgDog = document.createElement('img');
            imgDog.src = elem;
            divImages.appendChild(imgDog);
        });
    })
    .catch(error => console.log(error));

    // Fetch dog breeds
    const ulBreeds = document.getElementById('dog-breeds');
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(resp => resp.json())
    .then(data => {
        //console.log(data);
        for (const bigBreed in data.message) {
            if (data.message[bigBreed].length === 0) {
                const liBreed = document.createElement('li');
                liBreed.textContent = bigBreed;
                ulBreeds.appendChild(liBreed);
            } else {
                for (const smallBreed of data.message[bigBreed]) {
                    const liBreed = document.createElement('li');
                    liBreed.textContent = `${smallBreed} ${bigBreed}`;
                    ulBreeds.appendChild(liBreed);
                }
            }
        }

        // Make each dog breed changes its color when clicked.
        const arrLiBreeds = Array.from(ulBreeds.children);
        arrLiBreeds.forEach(li => {
            li.style.cursor = 'pointer';
            li.addEventListener('click', (e) => {
                e.target.style.color = '#00F';
            });
        });
        //console.log('arrLiBreeds length: ', arrLiBreeds.length);

        // Filtering breed feature
        const sltBreedFilter =  document.getElementById('breed-dropdown');
        sltBreedFilter.addEventListener('change', (e) => {
            ulBreeds.innerHTML = '';
            arrLiBreeds.forEach(li => {
                if (li.textContent[0] === e.target.value) {
                    ulBreeds.appendChild(li);
                }
            });
        })
    })
    .catch(error => console.log(error));

});
