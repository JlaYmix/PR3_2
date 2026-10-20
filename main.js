const $btn = document.getElementById('btn-kick');

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
};

$btn.addEventListener('click', function () {
    console.log('Kick');
    character.changeHP(random(20));
    enemy.changeHP(random(20));
});

document.querySelector('.logo').addEventListener('click', function () {
    location.reload();
});

function init() {
    console.log('Start Game!');
    character.renderHP();
    enemy.renderHP();
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressbarHP() {
    const percent = this.damageHP / this.defaultHP * 100;
    this.elProgressbar.style.width = percent + '%';

    this.elProgressbar.classList.remove('low', 'critical');
    if (percent < 20) {
        this.elProgressbar.classList.add('critical');
    } else if (percent < 60) {
        this.elProgressbar.classList.add('low');
    }
}

function changeHP(count) {
    if (this.damageHP <= count) {
        this.damageHP = 0;
    } else {
        this.damageHP -= count;
    }

    this.renderHP();

    if (this.damageHP === 0 && !$btn.disabled) {
        $btn.disabled = true;
        const name = this.name;
        setTimeout(function () {
            alert('Бідний ' + name + ' програв бій!');
        }, 50);
    }
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

init();