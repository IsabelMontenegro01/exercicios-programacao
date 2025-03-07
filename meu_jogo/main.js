// Importa as cenas do jogo que foram criadas em arquivos separados
import { GameScene } from "./scenes/game.js";
import { WelcomeScene } from "./scenes/welcome.js";
import { EndScene } from "./scenes/end.js";

// Configuração do jogo Phaser
const config = {
    type: Phaser.AUTO, // Define o tipo de renderização (AUTO escolhe entre WebGL e Canvas)
    width: 800, // Largura da tela do jogo
    height: 600, // Altura da tela do jogo
    backgroundColor: "#000000", // Define a cor de fundo como preto
    pixelArt: true, // Mantém os pixels nítidos ao escalar sprites
    roundPixel: false, // Evita arredondamento de pixels para gráficos suaves

    // Configuração de escala para ajustar o jogo à tela
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta o jogo para caber na tela mantendo a proporção
        autoCenter: Phaser.Scale.CENTER_BOTH // Centraliza o jogo na tela
    },

    // Configuração da física do jogo
    physics: {
        default: "arcade", // Usa o sistema de física "arcade" do Phaser
        arcade: {
            gravity: { y: 400 }, // Aplica gravidade no eixo Y (faz objetos caírem)
            debug: true // Ativa a exibição das caixas de colisão para depuração
        }
    },

    // Lista das cenas que serão usadas no jogo
    scene: [WelcomeScene, GameScene, EndScene] // Define a ordem das cenas do jogo
};

// Cria uma nova instância do jogo Phaser com a configuração definida acima
const game = new Phaser.Game(config);
