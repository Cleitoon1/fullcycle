SemVer: resumo do resumo, forma de versionar a aplicação https://semver.org/lang/pt-BR/ 

2.1.4
(2) - MAJOR - API PUBLICA
(1) - MINOR - adicionando funcionalidades, mas compativeis com a Api, não quebra o código atual
(4) - PATCH - Correção de Bugs

Inicia MAJOR = 0 - API Instável. Pode mudar a qualquer momento.
1.0.0-alpha, beta, rc0 já são versões menos instáveis que 1.0.0

Conventional commits: https://www.conventionalcommits.org/pt-br/v1.0.0/ - ter um padrão de escrita na hora de realizar os commits na hora de escrever o tipo, descrição e etc (tem plugin pro vscode pra ajudar), ler a documentação]

plugin para ajudar a escrver um commit seguindo o padrão: https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits

CommitLint: https://commitlint.js.org/, ferramenta para verificar se o commit está seguindo o padrão do Conventional commit é um hook ele não deixar fazer o commit se não estiver no padrão, o ruim é que é um pacote npm e precisa instalar no projeto, muito interessante

Commitsar https://commitsar.aevea.ee/, ferramenta que avalia o histórico de commits para verificar se estão seguindo o padrão, vai barrar o commit ou seja se o amiguinho conseguiu fazer o commit não vai conseguir mais uma verificação (exagero ?, não sei fica a reflexão)

Commitzen https://commitizen-tools.github.io/commitizen/ - ferramenta para escrever os commits, sem utilizar o plugin via vs code é igual só q no terminal, bom que não preciso ficar preso a abrir o vscode