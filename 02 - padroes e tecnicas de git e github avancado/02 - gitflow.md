Doc: https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow
Repositório do gitflow: https://github.com/nvie/gitflow

`git flow`: comando inicial
`git flow init`: comando para criar o repo e suas configurações de nome de branch e etc
`git flow feature start welcome` inciando uma nova feature ele ja criar um branch com a nomenclatura padrão 
`git flow feature finish welcome` vai finalizar a feature realizando o branch com develop (next-release) remove a branch e ja entra no develop
`git flow release start 0.1.0` prepara uma branch para deploy
`git flow release finish 0.1.0` finaliza a release, fazendo o merge na main e atualizando o develop (caso tenhatido alteração no release) deixando tudo atualizado

o mesmo vale para hotfix e etc, ele gera tudo com base no item que vamos fazer

o git flow é legal, mas faz um monte de coisa no aumatico, parece uma mão na roda a primeira vista, mas é perigoso, ainda mais q faz merge na master