const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  console.log(` ▄▄▄       ██▀███   ███▄    █  ▄▄▄      ▒███████▒▒██   ██▒
▒████▄    ▓██ ▒ ██▒ ██ ▀█   █ ▒████▄    ▒ ▒ ▒ ▄▀░▒▒ █ █ ▒░
▒██  ▀█▄  ▓██ ░▄█ ▒▓██  ▀█ ██▒▒██  ▀█▄  ░ ▒ ▄▀▒░ ░░  █   ░
░██▄▄▄▄██ ▒██▀▀█▄  ▓██▒  ▐▌██▒░██▄▄▄▄██   ▄▀▒   ░ ░ █ █ ▒ 
 ▓█   ▓██▒░██▓ ▒██▒▒██░   ▓██░ ▓█   ▓██▒▒███████▒▒██▒ ▒██▒
 ▒▒   ▓▒█░░ ▒▓ ░▒▓░░ ▒░   ▒ ▒  ▒▒   ▓▒█░░▒▒ ▓░▒░▒▒▒ ░ ░▓ ░
  ▒   ▒▒ ░  ░▒ ░ ▒░░ ░░   ░ ▒░  ▒   ▒▒ ░░░▒ ▒ ░ ▒░░   ░▒ ░
  ░   ▒     ░░   ░    ░   ░ ░   ░   ▒   ░ ░ ░ ░ ░ ░    ░  
      ░  ░   ░              ░       ░  ░  ░ ░     ░    ░  
                                        ░                 
By : ${chalk.bold('Arnazx#9611')}
`);

  const auth = rs.question('Enter Authentication Code! : ');
  console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Authentication Code Not Valid`));

    console.log(gradient('red', 'violet', 'blue', 'purple', 'blue', 'indigo', 'violet')(`\r[ ${moment().format('HH:mm:ss')} ] Code Auth sudah Expired!`));
            break;

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

console.log(chalk.bgBlack(`\r[ ${moment().format('HH:mm:ss')} ] ${chalk.white(`User : ${username}`)} | ${chalk.blue(`Trophy : ${trophy}`)} | ${chalk.red(`Crown : ${crown}`)}`));
      await sleep(4500);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Mampus ke banned akunnya aowokaw:v`));
     break;
    }
  }


})();
