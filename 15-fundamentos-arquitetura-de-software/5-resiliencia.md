Resilência é um conjunto de estratégias adotadas intencionalmente para a adaptação de um sistema quando uma falha ocorre

"Resilência: você se dobra ou quebra ?"

Ter estratégias de resiliência nos possibilita minimizar os riscos de perda de dados e transações importantes para o negócio

Quais as estratégias ?
 - Proteger e ser protegido
  - Um sistema em uma arquitetura distribuída precisa adotar mecanismos de autopreservação para garantir ao máximo sua operação com qualidade
  - Um sistema precisa não poder ser "egoísta" ao ponto de realizar mais requisições em um sistema que está falhando
  - Um sistema lento no ar muitas vezes é pior do que um sistema fora do ar (efeito dominó)
 - Health check
  - Sem sinais vitais, não é possível saber a "saúde" de um sistema
  - Um sistema que não está sauvável possui uma chance de se recuperar caso o tráfego pare de ser direcionado a ele temporariamente
  - Healthcheck de qualidade (ir além de apenas retornar um html falando que está tudo bem, ir além consultar banco e etc de fato ver que o sistema está saudável) 
 - Rate Limit
  - Protege o sistema baseado no que ele foi projetado para suportar
  - Preferência por ser programada por tipo de client
 - Circuit breaker
  - Protege o sistema fazendo com que as requisições feitas para ele sejam negadas. Ex 500.
  - Circuito fechado = Requisições chegam normalmente
  - Circuito aberto = Requisições não chegam ao sistema. Erro instantâneo ao client
  - Meio aberto = Permite uma quantidade limiteada de requisições para verificação se o sistema tem condições de voltar ao ar integralmente
 - API Gateway
  - Ex: Kong 
  - É possível implementar política de Rate Limiting, Health check, etc
 - Service Mesh
  - Controla o tráfego de rede
  - Evita implementações de proteção pelo próprio sistema
  - mTLS (proxy de critografia)
  - Circuit breaker, retry, timeout, fault injection, etc
 - Comunicação Assíncrona
  - Evita perda de dados
  - Não há perda de dasdos no envio de uma transação se o servidor estiver fora
  - Servidor pode processar a transação em seu tempo quando estiver online
  - Entender com profundidade o message broker / sistema de stream
 - Garantias de entraga com Retry
 - Garantias de entrega com Kafka
  - Explicação sobre o Ack do Kafka onde temos tipo de mensagens, em que o proceder apenas envia a mensagem, ou quando ele espera a confirmação e como ele influência na performance e outros prós e contras
 - Situações complexas e decisões de alto nível
  - O que acontece se o message broker cair ?
   - Havera perda de mensagens ?
   - Seu sistema ficará fora do ar ?
   - Como garantir resiliência