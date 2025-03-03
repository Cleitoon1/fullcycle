Código: https://github.com/devfullcycle/fc-grpc
Ggrpc https://grpc.io/:
 - gRPC é um framework desenvolvido pela google que tem o objetivo de facilitar o processo de comunicação entre sistema de uma forma extremamente rápida, leve, independente de linguagem

Em quais casos podemos utilizar ?
 - Ideal para microsserviços (por ser rápido, leve)
 - Mobile, Browser e Backend
 - Geração das bibliotecas de forma automática
 - Streaming biderecional utilizando HTTP/2
 - Linguagens (Suporte Oficial): grpc-GO, grpc-JAVA, grpc-C (C++, Python, Ruby, Objective C, PHP, C#, Node.js, Dart), todas essas linguagens conseguem instalar pacotes baseado em C

 RPC - Remote Procedure Call
  - Trafega através do HTTP/2
  - Utiliza Protocol Buffers: Protocol Buffers (Protobuf) é um formato de serialização de dados desenvolvido pela Google. Ele armazena dados estruturados de forma eficiente e compacta em formato binário, permitindo uma transferência mais rápida através de ligações de rede. O protobuf funciona usando um arquivo de definição de mensagem, que especifica a estrutura dos dados que serão serializados e desserializados. É útil no desenvolvimento de programas que se comunicam uns com os outros ou para armazenar dados
  - Protocol Buffers vs Json
   - Arquivarios binários < JSON (como os arquivos são binários são muito menos que o JSON)
   - Processo de serialização é mais leve (CPU) do que JSON
   - Gasta menor recursos de rede
   - Processo é mais veloz
   - Utiliza contrato (estilo XML)

HTTPS/2
 - Nome original criado pela google era SPDY
 - Lançado em 2015
 - Dados trafegado são binários e não texto como HTTP 1.1
 - Utilizar a mesma conexão TCP para enviar e receber dados do cliente e do servidor (Multiplex)

gRPC - API "Server streaming"
 - Client e Server podem se comunicar com diversas chamadas na mesma requisição, graças ao HTTP2 
 - permite a comunicação bidirecional

REST vs gRPC
 - REST
  - Texto/JSON
  - Unidirecional
  - Alta latência
  - Sem contrato (maior chance de erros)
  - Sem suporte a streaming (Request/Response)
  - Design pré-definido
  - Biliotecas de terceiro
 - gRPC
  - Protocol Buffers
  - Bidirecional e assíncrono
  - Baixa latência
  - Contrato definido (.proto)
  - Suporte a streaming
  - Design é livre
  - Geração de código

Site do Protocol buffers: https://developers.google.com/j2objc/guides/using-protocol-buffers?hl=pt-br

O resto foi demonstração em GO de como criar uma API utilizando GO que trabalha com GRPC, mas como tem o docker no projeto apenas rodei para ver os resultados

