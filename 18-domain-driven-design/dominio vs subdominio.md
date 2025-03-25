Domínio seria meu todo
SubDomínio seria uma parte do meu todo
CoreDomain, domínio principal parte do meu sistema que sem ela meu sistema não existiria (ex: Netflix sem filme)
    - Coração do negócio
    - Diferencial competitivo da empresa
Support subdomain (sub domínio de suporte)
    - Apoiam o domínio principal (ex: centro de distribuição de uma loja)
    - Faz a operação do domínio possível
Generic subdomain (sub domínio genérico):
    - Softwares auxiliares (ex: geração de boletos)
    - Sem diferencial competitivo


Problema vs Solução
Problema:
    - Visão geral do domínio e suas complexidades
        Subdomínios

Solução:
    - Análise e modelagem do domínio
        - Contextos delimitados

O que é um contexto delimitado (Bounded Context), resumo: uma divisão explicita de um modelo que estamos modelando (genérico pra *****), deve refletir a linguagem do negócio (nome falados, termos e etc, utilizar a linguagem do negócio)

Contexto é rei:

exemplo palavras iguais para coisas diferentes, Ticket em venda de ingressos e Ticket em suporte ao cliente, é a mesma palavra mas em CONTEXTOS diferentes, ai entender a linguage ubiqua de cada contexto é importante (isso em um monolito ja traz problema de não ficar tão fiel por ser 2 entidades com nome diferentes, como o software deve obdecer ao contextos ja é um precedente para modularizar o sistema e evidenciando como o contexto é que comanda)

Elementos Transversais: Cliente nos 2 contextos citados acima ele tem funções diferentes, na venda de ingressos estamos olhando para evento, ticket, local, vendedor. Quando vemos no suporte é outro espectro são itens como Ticket, Dúvida, Departamento, Responsável. São visões diferentes para o mesmo item