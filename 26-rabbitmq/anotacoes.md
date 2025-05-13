# RabbitMQ

 - Message Broker (um intermediario entre um ponto e outro, no caso entre o publisher e o consumer)
 - Implementa os protocolos AMQP, MQTT, STOMP e HTTP (sendo AMQP o mais utilizado)
 - Desenvolvido em Erlang
 - Desacoplamento entre serviços
 - Rápido e poderoso
 - Padrão de mercado

Por baixo dos panos:
  - A comunicação é feita em TCP e é feito apenas uma conexão, é possível ter "subconexões" que são os channels o que traz varios beneficios como o reaproveitamento da conexão ja criada economiza recurso, é chamado de Multiplexing connections, 1 thread por channel

Funcionamento basico:
 - Publish envia mensgem para fila Consumer a lê
    - nem sempre a mensagem vai direto para fila pode ser que ela vá para um exchange que é como um roteador que recebe uma mensagem e determina para qual fila ela será redirecionada
 - Tipo de Exchange:
    - Direct, a mensagem vai para o exchange e ele manda direto para uma fila
    - Fanout, quando eu mando uma mensagem para um exchange ele envia a mensagem para todas as filas que estão relacionadas a aquele exchange
    - Topic, a mensagem é encaminhada para a fila seguindo determinada regra, o rotuing key da mensagem
    - Headers, pelo header da mensagem é determinado para qual fila vai, Obs: é o tipo menos utilizado
    - tudo é definido pela routing key, no direct é o nome da fila, no topic pode ser um regex onde seria roteado para todas filas que passem naquela expressão 
 - Queues (filas)
    - Por padrão FIFO - First In, First Out (tem esquemas de prioridade, mas é algo muito específico)
    - Propriedades:
        - Durable: se ela deve ser salva mesmo depois do restart do broker, lembrando que quando ele é reiniciado as filas que não são deste tipo são limpas pois estão somente em memoria
        - Auto delete: removida automaticamente quando o consumer se desconecta
        - expiry: definide o tempo que não há mensagens ou clientes consumindo (ela é removida quando bate o tempo)
        - Message TTL: tempo de vida da mensagem, se ninguem consumer a mensagem nesse tempo de vida ela é removida
        - Overflow (caso a fila tiver limite de mensagem):
            - Drop head (remove a última, caso a fila tiver lotada remove a ultima mensagem e encaixa essa)
            - Reject publish (se a fila tiver lotada, não permite que uma nova mensagem seja publicada)
        - Exclusive: somente channel que criou pode acessar
        - max length ou bytes: quantidade de mensagem em tamanho de bytes máximo permitido, exemplo a fila ter 2 mb de mensagem
        - no a dia não sei diz criar uma fila, mas sim declarar (i rapaz falamos errado na firma)
    - Dead letter queues
        - algumas mensgens não conseguem ser entregue por qualquer motivo, pode ser encaminhadas para uma exchange específica que roteia as mensagens para uma dead letter queue, tais mensagens podem ser consumidas e averiguadas posteriormente
    - Lazy queues
        - mensagens são armazenadas em disco
        - Problema que exisge alto I/O, exige muito do disco e a leitura não fica tão rápida quanto a leitura em memória

Simulador de fluxo do rabbitmq https://tryrabbitmq.com/, que maneiro !, uma aula de exemplo dos itens acima nesse simulador

Confiabilidade:
    - Como garantir que as mensagens não serão perdidas no meio do caminho ?
    - Como garantir que as mensagens puderam ser processadas corretamente pelos consumidores ?
    - Reucrsos do RabbitMQ pensado para essas situações:
        - Consumer acknowledgement (consumer avisa que leu a mensagem)
            - Basic.Ack, o aviso que o consumer recebeu e leu a mensagem, seria mensagem de sucesso
            - Basic.Reject, o aviso que o consumer não conseguiu ler a mensagem, faz a mensagem voltar para a fila
            - Basic.Nack, mesma coisa do reject, mas é feito para mais de uma mensgem ao mesmo tempo
        - Publisher confirm, exchange confirma ao publisher que recebeu a mensagem, enviando um ack para o publisher com um id pre determinado pelo publisher, mas em caso de erro o publisher receberia um nack daquela mensagem
        - filas e mensagens duráveis/persistidas, é bom que a mensagem não é perdida, mas tem seus contras porque tudo vai pro disco

RabbitMQ UI:
    - aquela passada pela UI do rabbitmq

 - Módulo interessante para quem já utiliza no dia a dia que acaba tendo uma explicação pontual que adiciona, mas para quem nunca viu RabbitMq não seria um bom módulo por ser "apenas teorico" e muito rapido (o que já vi que foi corrigido na versão 4.0 do curso)