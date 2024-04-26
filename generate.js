const { faker } = require('@faker-js/faker');

function generateUser() {
  const random = Math.random().toString().slice(2, 6);
  const username = faker.internet.userName() + '_' + random;
  const password = faker.internet.password();

  const randomGenderNumber = Math.round(Math.random() * 1);
  const genders = ['Male', 'Female'];
  const gender = genders[randomGenderNumber];

  const hasHobbies = Math.round(Math.random());

  const hobbies = [];

  if (hasHobbies) {
    const randomHobbiesNumber = Math.round(Math.random() * 2);
    let hobbiesCopy = ['Reading', 'Sports', 'Music'];

    for (let i = 0; i <= randomHobbiesNumber; ++i) {
        const rnd = Math.round(Math.random() * (randomHobbiesNumber - i));

        hobbies.push(hobbiesCopy[rnd]);
        hobbiesCopy.splice(rnd, 1);
    }
  }

  const randomTimeNumber = Math.round(Math.random() * 2);
  const times = ['Morning', 'Noon', 'Evening'];
  const timeOfDay = times[randomTimeNumber];

  return { 
    username,
    password,
    gender,
    hobbies,
    timeOfDay
  };

}

module.exports = { generateUser };