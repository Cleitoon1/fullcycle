Event storming
É uma técnica criada por Alberto Brandolini para que possamos entender de forma mais clara o domínio das aplicações através dos eventos gerados por elas.
Normalmente acontece em um formato de workshop. É uma dinâmica de grupo envolvendo "domain experts" e a área técnica.

Livro: Event Stoming - Alberto Brandolini

Mapeando todos eventos do sistema é possível entender tudo que o sistema faz
 
Marcações:
    - azul - comando executar uma ação
    - laranja - evento, resultado de uma ação feita (sempre no passado)
    - amarelo - ator, o usuário
    - roxo - policy, políticas
    - tem outras...

Policy: é algo que acontece através de um gatilho e essa policita define o que será feito, quando o evento x ocorrer fazer y 
 - exemplo quando o usuário faz a assinatura, vou ter o evento de assinatura inciada ela vai ser enviado para um gateway de pagamento onde essa assinatura é paga ou não, logo a assinatura é realizada ou cancelada, essa tomada de decisão se confirma ou não é um policy

 Definição de cronologia: ter o fluxo na ordem em que acontece

mapeamento da aplicação codeflix (aplicação final do curso) feito com base na técnica e nela tem a explicação de como foi feito o mapeamento
https://whimsical.com/event-storming-LR9ex19rzbFaq4o2yEo9DQ


módulo cansativo, é um resumão