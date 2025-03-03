REST:
 - Representational state of transfer
 - Surgiu em 200 por Roy Fielding em uma dissertação de doutorado
 - Simplecidade
 - Stateless
 - Cacheável

REST: níveis de maturidade (RichardSon Matrutiry Model)
 - Nível 0: The swamp of POX (sem padronização)
 - Nível 1: Utilização de resources (utilizar o verbo http correto para cada operação e padronizado(GET, POST, PUT, DELETE))
 - Nível 2: Verbos HTTP (utilizar o verbo certo para operação correta)
  - GET: Recuperar informação
  - POST: Inserir
  - PUT: Alterar
  - DELETE: Remover
 - Nível 3: HATEOAS: Hypermedia as the Engine of Application State, responder a ação informando qual são as ações disponíveis para aquele recursos (os próximos passos)
  - Exemplo: Endpoint de criação de conta, devolvendo o payload com as infos de conta e com os links para os proximos passos que seria: depositar, realizar saque, transferir e encerrar


REST: Uma boa API Rest
 - Utiliza URIs única para serviços e itens que expostos para esses serviços
 - Utiliza todos os verbos HTTP para realizar as operações em seus recursos, incluindo caching
 - Provê links relacionais para os recursos exemplificando o que pode ser feito

REST: HAL, Collection+JSON e Siren
 - JSON não provê um padrão de hipermedia par realizar a linkagem
 - HAL: Hypermedia Application Language
  - Media type = application/hal+json
  - padrão diferente de retorno, com um retorno diferente, de fato padronizado, aplicando HATEOAS, da uma experiência muito maior para que está acessando o JSON com links para todos os recursos do JSON (até mesmo para os relacionados)


REST: HTTP Method Negotiation
 - HTTP possui um outro método OPTIONS. Esse método nos permite informar quais método são permitidos ou não em determinado recursos, exemplo:
    OPTIONS /api/product HTTP/1.1
    Host: fullcycle.com.br

    Resposta pode ser

    HTTP/1.1 200 OK
    Allow: GET, POST

    Caso envie a requisição em outro formato:
    HTTP/1.1 405 Not Allowed
    Allow: GET, POST

REST: Content Negotiation
 - O processo de contente negotition é baseado na requisição que o client está para o server. Nesse caso ele solicitada o que e como ele quer a resposta. O server então retornará ou não a informação no formato desejado.

 - Accept Negotiation
  - Cliente solicita a informação e o tipo de retorno pelo server baseado no media type informado por ordem de prioridade. Exemplo

    GET /product
    Accept: apllication/json

    a resposta pode ser o retorno dos dados ou:
    HTTP/1.1 406 Not Acceptable

 - Content-Type Negotiation
  - Atráves de um content-type no header da request, o servidor consegue verificar se ele irá conseguir processar a informação para retornar a informação desejada

    POST /product HTTP/1.1
    Accept: application/json
    Content-Type: application/json

    Caso o servidor não aceite o content type, ele poderá retornar:

    HTTP/1.1 Unsupported Media Type

 - Content negotiation na prática
  - Demonstração de uma API com todos padrões acima, utilizando o Laminas API Tools e demonstração dos status, dos links e etc, muito legal e fácil de configurar
  - https://api-tools.getlaminas.org/