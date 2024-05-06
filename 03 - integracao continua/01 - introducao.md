Processo de integrar modificações do código de forma contínua e automatizada, evitando erros humanos em algum ponto do processo

exemplo de fluxo que pode(deve) ser automatizado: execução de teste -> verificar sintaxe -> itens de segurança -> gerar builds para o processo de deploy -> gerar tags e releases
exemplo de ferramentas de integração contínua: Jenkins, Github Actions, Circle CI, AWS CodeBuild, Azure Devops, Google Cloud Build, Gitlag Pipelines/CI

Qual vai ser utilizada no curso: Github Actions :)

https://github.com/features/actions - automatizador de workflow de desenvolvimento de software, com base nos eventos do github faz várias tarefas incluindo diversos processos de integração contínua

Workflow:
 o que é ?: um conunto de eventos, ex: fazer build e executar testes
 onde fica ?: .github/workflows, são arquivos .yml
 quando roda ?: com base em algum evento definido por mim exemplo push ou agendamento
 onde rodar?: posso definir em qual sistema irá rodar ex rodar num ubuntu

Action:
 o que é ?: uma ação, um passo a ser feito dentro do Workflow, posso fazer na mão, mas tbm posso pegar uma pré feita no marketplace


Custos: consultar tabela, mas da pra brincar de graça 2000 minutos free
https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions


Ele tem diversos exemplos de workflow e um market place com diversos actions criados por terceiros para diversas linguagens não atoa cresceu muito nos ultimos tempo


