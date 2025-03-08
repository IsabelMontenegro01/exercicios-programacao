//Cria classe End que herda atributos da classe Phaser
export class EndScene extends Phaser.Scene {

    //Define altura e largura na tela final do jogo
    alturaJogo = 600;
    larguraJogo = 800;

    //Chama o construtor da classe mãe (Phaser.Scene) e registra esta cena com o nome "EndScene"
    constructor() {
        super("EndScene");
    }

    //Recebe o resultado do jogo
    init(data) {
        this.resultado = data;
    }

    preload() {
        //Carrega as imagens da cena final
        this.load.image("paisagem", "./assets/paisagem.png");
        this.load.image("computador", "./assets/computador_paisagem.png");
        this.load.image("fantasma", "./assets/fantasma.png");
        this.load.image("ganhou", "./assets/ganhou.png");
        this.load.image("menu", "./assets/botao_menu.png");
        this.load.image("restart", "./assets/botao_restart.png");
    }

    create() {
        //Adiciona o fundo da cena
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "computador");
        this.add.image(this.larguraJogo/2, 250, "fantasma").setScale(0.15);


        //Ao clicar no botão Menu ele volta para a tela inicial
        this.botaoMenu = this.add.image(this.larguraJogo/2 - 70, 320, "menu").setScale(0.2).setInteractive();
        this.botaoMenu.on("pointerdown", () => {
            this.scene.start("WelcomeScene")
        })

        //O cursor muda para símbolo de clicável, ao passar o mouse pelo botão Menu
        this.botaoMenu.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        //O cursor fica normal quando mouse não está no botão Menu
        this.botaoMenu.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });


        //Ao clicar no botão Restart ele sai da cena final e volta para cena do jogo
        this.botaoRestart = this.add.image(this.larguraJogo/2 + 70, 320, "restart").setScale(0.2).setInteractive();
        this.botaoRestart.on("pointerdown", () => {
            this.scene.stop("EndScene");
            this.scene.start("MainScene");
        })


        //O cursor muda para símbolo de clicável, ao passar o mouse pelo botão Restart
        this.botaoRestart.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });
        
        //O cursor fica normal quando mouse não está no botão Restart
        this.botaoRestart.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });


        //Se o jogador ganhou, exibe a imagem de ganhou
        if (this.resultado === "ganhou"){
            this.add.image(this.larguraJogo/2, 190, "ganhou").setScale(0.3);
        }
        
    }

    update() {

    }
}