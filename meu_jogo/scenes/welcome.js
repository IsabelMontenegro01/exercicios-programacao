//Cria classe Welcome que herda atributos da classe Phaser
export class WelcomeScene extends Phaser.Scene { 

    //Define altura e largura na tela inicial do jogo
    alturaJogo = 600;
    larguraJogo = 800;

    //Chama o construtor da classe mãe (Phaser.Scene) e registra esta cena com o nome "WelcomeScene" 
    constructor() {
        super("WelcomeScene");
    }

    preload() {
        //Carrega as imagens usadas na cena
        this.load.image("paisagem", "../assets/paisagem.png");
        this.load.image("computador", "../assets/computador_paisagem.png");
        this.load.image("fantasma", "../assets/fantasma.png");
        this.load.image("play", "../assets/botao_play.png");
    }

    create() {
        //Adiciona o fundo da tela inicial
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "computador");

        //Adiciona o botão play
        this.botaoJogar = this.add.image(this.larguraJogo/2, 290, "play").setScale(0.2).setInteractive();

        //O cursor muda para símbolo de clicável, ao passar o mouse pelo botão play
        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        //O cursor fica normal quando mouse não está no botão play
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });
        //Quando clica no botão ele inicia o jogo
        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("MainScene")
        })
    }

    update() {

    }
}