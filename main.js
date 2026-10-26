import Pokemon from './pokemon.js';
import random from './utils.js';

const $btn = document.getElementById('btn-kick');

const player1 = new Pokemon({
    name: 'Pikachu',
    type: 'electric',
    hp: 100,
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'fire',
    hp: 100,
    selectors: 'enemy',
});

console.log(player1, player2);

function finishGame(losers) {
    $btn.disabled = true;
    const text = losers.length > 1
        ? 'Нічия! Обидва покемони програли бій!'
        : 'Бідний ' + losers[0].name + ' програв бій!';
    setTimeout(function () {
        alert(text);
    }, 50);
}

function attack(attacker, target) {
    target.changeHP(random(20, 5), function (count) {
        console.log(
            `${attacker.name} завдав ${count} шкоди → ${target.name}: ` +
            `${target.hp.current} / ${target.hp.total}`
        );
    });
}

$btn.addEventListener('click', function () {
    console.log('Kick');
    attack(player2, player1);
    attack(player1, player2);

    const losers = [player1, player2].filter(p => p.hp.current === 0);
    if (losers.length && !$btn.disabled) {
        finishGame(losers);
    }
});

document.querySelector('.logo').addEventListener('click', function () {
    location.reload();
});
