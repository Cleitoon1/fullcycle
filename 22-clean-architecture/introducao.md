Clean Architecture:

 - termo criado por Robert C. Martin (Uncle Bob) em 2012
 - Tornou-se um livro - Clean Architecture
 - Buzz word
 - Proteção do domínio da aplicação
 - Baixo acoplamento entre as camadas
 - Orientada a casos de uso (baseado em intenção)
 - Recomendação sobre o livro, o módulo vai abranger muitas coisas do livro inclusive cita-los em muitos momentos, mas é importante "beber a água direto da fonte" 
  - ele fala especificamente sobre "Clean Arch" em somente 7 páginas do livro
  - tudo que ele fala especificamente sobre Clean Arch está literalmente em seu blog
  - entender as ideias da camada não é algo tão díficil, mas sim o embasamento para entender o porque a estrutura faz sentido
  - Porque ler ?
   - Reforçar conhecimento e remover gaps básicos que muitas vezes nem percebemos que temos
   - Componentes
   - Arquitetura
   - Percepção sobre regras de negócios
   - Beber água direto da fonte sempre importa 

Pontos importantes sobre arquitetura
 - Formato que o software terá
 - Divisão de componentes
 - Comunicação entre componentes
 - Uma boa arquitetura vai facilitar o processo de desenvolvimento, deploy, operação e manutenção
 - "The strategy behind that facilitation is no leave as many options open as possibile, for as long as possible" - p.136

Objetivos de uma boa arquiteura

O objetivo de uma boa arquitetura é dar suporte ao ciclo de vida do sistema. Uma boa arquitetura torna o sistema fácil de entender, fácil de desenvolver, fácil de manter e fácil de implantar. O objetivo final é minimizar o custo de vida útil do sistema e maximizar a produtividade do programador. p 137

Keep Options Open ! (mantenha portas abertas)
Regras vs Detalhes
 - Regras de negócio trazem o real valor para o software
 - Detalhes ajudam a suportar as regras
 - Detalhes não devem impactar as regras de negócio
 - Frameworks, banco de dados, apis, não devem impactar as regras, são apenas "detalhes" plugados no software que podem ser substítuidos com o passar do tempo
  - Lembra do DDD - atacar a complexidade no coração do software

Use Cases (casos de uso)
 - intenção...
  - casos de uso contem uma história, ele é o processo de automação
 - clareza de cada comportamento do software
 - detalhes não devem impactar nas regras de negócio
   - novamente que frameworks e etc não devem impactar as regras, pois até esse somente é somente lógica, regra de negócio não tem nada sobre outras coisas
 - SRP, Princpio da Responsabilidade Única (Single Responsability Principle)
  - Temos a tendência de "reaproveitar código" por serem muito parecidos
   - Ex: alterar vs inserir. Ambos consulta se o registro existem, persistem dados. MAS, são uses cases diferentes. Porque ?
   - SRP => mudam por razões diferentes
    - Hoje eles podem ser muitos parecidos, eles vão mudar por razões diferentes
 - Duplicação real vs acidental

Limites Arquiteturais
"Tudo que não impacta diretamente nas regras de negócio deve estar em um limite arquitetural diferente. Ex: Não será o frontend, banco de dados que mudarão as regras da aplicação"

Input vs Outuput
 - No final do dia, tudo se resume a um input que retorna um output
  - Ex criar um pedido (dados do pedido = input), pedido criado (dados do retorno do pedido = output)
 - Simplifique seu raciocínio ao criar um software sempre pensando em Input e Output

DTO (Data Transfer Object):
 - Trafegar dados entre os limites arquiteturais
 - Objeto anêmico, sem comportamento
 - Contém dados (Input ou Output)
 - NÃO POSSUI REGRAS DE NEGÓCIO
 - NÃO POSSUI COMPORTAMENTO
 - NÃO FAZ NADA

API -> Controller -> UseCase -> Entity
 - Controller cria um DTO com os dado recebidos e envia para o UseCase
 - UseCase executa seu fluxo, pega o resultado, cria um DTO para output e retorna para o Controller

Presenters
 - Objetos de transformação
 - Adequa o DTO de output no formato correto para entrega o resultado
 - Lembrando: um sistema pode ter diversos formatos de entrega: ex: XML, JSON, Protobuf, GraphQL, CLI, etc.

 Entities
 - Entities da Clean Arch <> Entities do DDD
 - Clean Arch define entity como camada de regras de negócio
 - Elas se aplicam em qualquer situação
 - Não há definição explicita de como criar as entities
 - Normalmente utilizamos táticas do DDD
 - Entities = Agregados + DomainServices