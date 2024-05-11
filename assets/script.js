let char = new Knight('Junior');
let monster = new LittleMonster();

// Cria uma instância da classe Log
let log = new Log(document.querySelector('.log'));

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log // Passa a instância de Log para a classe Stage
);

stage.start();
