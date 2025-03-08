//Cria classe Game que herda atributos da classe Phaser
export class GameScene extends Phaser.Scene {

    //Define altura e largura na tela do jogo
    alturaJogo = 600;
    larguraJogo = 800;

    //Lista para armezar as plataformas
    plataformas = [];

    //Chama o construtor da classe mãe (Phaser.Scene) e registra esta cena com o nome "MainScene" 
    constructor() {
        super("MainScene");
    }

    preload() {
        //Carega as imagens usadas na cena
        this.load.image("paisagem", "./assets/paisagem.png");
        this.load.image("plataforma", "./assets/plataforma.png");
        this.load.audio("musicaFundo", "./assets/musica.mp3");
        this.load.image("caveira", "./assets/caveira.png");
        this.load.image("fantasma", "./assets/fantasma.png");
    }

    create() {

        //Inicializa a pontuação
        this.pontuacao = 0; 


        //Adiciona o fundo do jogo
        this.add.image(this.larguraJogo/2, this.alturaJogo/2, "paisagem").setScale(0.9);

        //Cria o jogador (fantasma) e define colisão com os limites do jogo
        this.player = this.physics.add.sprite(this.larguraJogo/2, 100, 'fantasma').setScale(0.2); 
        this.player.setCollideWorldBounds(true);

        //Cria 1ª plataforma estática
        this.plataformas[0] = this.physics.add.staticImage(200, 450, 'plataforma');
        //Define o tamanho da hitbox e ajusta automaticamente a origem para centralizá-la.
        this.plataformas[0].body.setSize(148, 44, true);
        //Reduz o tamanho da plataforma para 30% do seu tamanho original.
        this.plataformas[0].setScale(0.3);

        //Mesma coisa para a 2ª plataforma
        this.plataformas[1] = this.physics.add.staticImage(580, 360, 'plataforma');
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(0.3);


        //Pára a música anterior antes de tocar novamente
        if (this.musica && this.musica.isPlaying) {
            this.musica.stop();  
        }
    
        //Inicia música de fundo
        this.musica = this.sound.add("musicaFundo");
        this.musica.play({
            loop: false,
            volume: 0.5
        });

        //Cria um sprite chamado "caveira" na posição indicada e associa à física do jogo e tem seu tamanho reduzido para 10% do original
        this.caveira = this.physics.add.sprite(this.larguraJogo/3, 0, 'caveira').setScale(0.1);

        //Define que a caveira  pára ao tocar as bordas da tela
        this.caveira.setCollideWorldBounds(true); 

        //Faz com que a caveira não consiga se sobrepor às plataformas
        this.physics.add.collider(this.caveira, this.plataformas[0]); 
        this.physics.add.collider(this.caveira, this.plataformas[1]);   

        //Quando o player encostar na caveira ela ficará invisível
        this.physics.add.overlap(this.player, this.caveira, () => { 
        this.caveira.setVisible(false); 

        //Gera um número aleatório entre 50 e 650 para a posição Y da caveira
        var posicaoCaveira_Y = Phaser.Math.RND.between(50, 650);

        //Define a nova posição da caveira, movendo-a para a posição sorteada no eixo X e 100 para eixo Y
        this.caveira.setPosition(posicaoCaveira_Y, 100); 
        
        //Soma 1 ponto na Pontuação
        this.pontuacao += 1;

        //Atualiza o placar
        this.placar.setText('Pontuação: ' + this.pontuacao); 

        //Torna a caveira visível na nova posição
        this.caveira.setVisible(true); 
    })


        //Percorre todas as plataformas dentro da lista
        for (let i = 0; i < this.plataformas.length; i++){ 
            //Adiciona uma colisão entre o jogador e a plataforma atual
            this.physics.add.collider(this.player, this.plataformas[i]);
        }
        
        //Adiciona as setas do teclado
        this.cursors = this.input.keyboard.createCursorKeys();
    

        //Adiciona o placar na tela
        this.placar = this.add.text(50, 50, 'Pontuação:' + this.pontuacao, {fontSize:'45px', fill:'#FFFFFF'});
    }

    update() {

        //Movimento da caveira
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

        } else {
            this.player.setVelocityX(0);
        }

        // Lógica de pulo (vertical) 
        if (this.cursors.up.isDown) { 
            this.player.setVelocityY(-400);
        }

        //Acelera a descida
        if (this.cursors.down.isDown) {
            this.player.setVelocityY(400);  
        }

        // Se a pontuação atingir 8, muda para a cena de fim de jogo
        if (this.pontuacao >= 8){
            this.scene.stop('MainScene');
            this.scene.start('EndScene', "ganhou");
            this.musica.stop(); 
        }

        
    }
}