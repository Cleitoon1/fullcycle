Sistemas Monolíticos

O que é uma aplicação monolítica
 - aplicações "tradicionais"
 - "tudo em um"
 - Unidade de deployment

Polêmica por trás das aplicações monolíticas
 - aplicacções da década passada
 - ultrapassado
 - não escalam
 - impedem o crescimento do negócio
 - alto acoplamento

Grande parte dos argumentos são: FALSOS

Quando utilizar monolitos pode ser uma boa
 - Novos projetos onde o modelo de negócio não está claro
 - instabilidade no core do negócio
 - evita complexidade no processo de deploy

 95% das vezes, utilizar sistemas monolíticos é a melhor opção !

 Tipos de sistemas monolíticos (newman, Sam. Monolith to Microservices (p.21). O'Reilly Media)
  - Single process: 
    - Sistema -> Banco de Dados
    - Tipos:
     - Alto acoplamento 
     - Modular
      - Modulo A, B, C, D e E -> Banco de Dados
      - Modulos quebrados em "bounded contexts"
      - Conversam através de contratos e facades
      - Entidades podem ser "duplicadas" tendo apenas os atributos necessários
      - Equipes especializadas por módulos
      - Alta coseão: O que muda junto, permanece junto
     - modular com banco de dados segregados
      - modulo A,B,C,D e E -> Banco de dados A, B, C, D e E (podendo ser schema)
    - Principais problemas com essa abordagem
     - Não existe contexto
     - Entidades que se relacionam
     - Não há divisão. Tudo faz parte de tudo. Tudo grudado em tudo.
     - Efeitos colaterais indesejados
  - monolitos distribuídos: 
  - blackbox: 


DDD é um ponto de partida
delimitar contextos
    - Catalogo[User]
    - Carrinho[User]
    - Checkout[User]
    - Pagamentos[Cliente]
    - Suporte ao Cliente[Cliente]
    - Marketing[Lead]
    e ...

So é pra segregar tanto (monolíticos modulares), não é melhor ja utiizar o microserviços ?
 - um unico deploy
 - unica operação
 - observabilidade simplificada
 - sistemas se comunicando internamente
 - única linguagem, menos governança

Pontos de atenção:
 - Framework
 - Shared Kernel