// Definição da classe Character
class Character {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

// Definição das classes Knight, Sorcerer, LittleMonster e BigMonster
class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor(name) {
        super('LittleMonster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character {
    constructor(name) {
        super('BigMonster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

// Definição da classe Stage
function Stage(fighter1, fighter2, fighter1El, fighter2El, log) {
    function update() {
        function updateFighter(fighter, fighterEl) {
            const { name, life, maxLife } = fighter;
            const pct = (life / maxLife) * 100;
            fighterEl.querySelector('.name').innerHTML = `${name} - ${life} HP`;
            fighterEl.querySelector('.bar').style.width = `${pct}%`;
            if (life <= 0) {
                log.addMessage(`😵 ${name} foi derrotado!`, 'log-message-death');
            }
        }

        updateFighter(fighter1, fighter1El);
        updateFighter(fighter2, fighter2El);
    }

    function doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) return;

        const attackFactor = (Math.random() * 2).toFixed(2);
        const defenseFactor = (Math.random() * 2).toFixed(2);

        const actualAttack = attacking.attack * attackFactor;
        const actualDefense = attacked.defense * defenseFactor;

        if (actualAttack > actualDefense) {
            const damage = actualAttack - actualDefense;
            attacked.life -= damage;
            log.addMessage(`⚔️ ${attacking.name} causou ${damage.toFixed(2)} de dano a ${attacked.name}`, 'log-message');
        } else {
            log.addMessage(`🛡️ ${attacked.name} conseguiu defender do ataque de ${attacking.name}`, 'log-message');
        }

        if (attacked.life <= 0) {
            attacked.life = 0; // Garante que a vida não fique negativa
            log.addMessage(`😵 ${attacked.name} foi derrotado!`, 'log-message-death');
        }

        update();
    }

    function start() {
        update();

        fighter1El.querySelector('.attackButton').addEventListener('click', () => doAttack(fighter1, fighter2));
        fighter2El.querySelector('.attackButton').addEventListener('click', () => doAttack(fighter2, fighter1));
    }

    return { start };
}

// Definição da classe Log
class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
        this.listEl.addEventListener('DOMNodeInserted', () => {
            this.listEl.scrollTop = this.listEl.scrollHeight;
        });
    }

    addMessage(msg, className) {
        this.list.push({ msg, className });
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';
        this.list.forEach(({ msg, className }) => {
            const li = document.createElement('li');
            li.textContent = msg;
            if (className) {
                li.classList.add(className);
            }
            this.listEl.appendChild(li);
        });
    }
}
