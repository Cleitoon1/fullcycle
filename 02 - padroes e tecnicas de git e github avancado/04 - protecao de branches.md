resumo do porque: PARA NÃO VIRAR CASA DA MÃE JOANA, apesar de as vezes ser preciso

doc: https://docs.github.com/pt/pull-requests

ir nas configurações do repositorio -> branch -> adicionar regra de conversão
 - doc: https://docs.github.com/pt/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
 - regra criada no repo que não permite fazer um commit direto na main (olhar no repo)

modelo de template para Pull requests: https://embeddedartistry.com/blog/2017/08/04/a-github-pull-request-template-for-your-projects/
arquivo de modelo em ./github/PULL_REQUEST_TEMPLATE.md, pr feito utilizando https://github.com/Cleitoon1/fullcycle/pull/3

aula exibindo todo  fluxo de review de ter usuario comentando e outro respondendo, pedindo alteração e etc (é possível adicionar rule par não permitir merge em pr com comentarios em aberto, tbm número minimo de aprovações) não vou fazer por ser o meu dia a dia e a preguiça de criar outro usuário e não ser algo de documentação simples

CODEOWNERS - meu deus como não ouvi fala disso até hoje, é poder marcar um "dono" para aquele, arquivo, pasta e ou tipo, claro que é bom não abusar, mas em caso de lógicas muito pesadas é ótimo ter isso para poder marcar o "pai da criança" para pelo menos fazer o review quando aquele trecho for alterado, para utilizar é necessário criar o arquivo com essas configurações ./github/CODEOWNERS e alterar políticas no github para deixar como revisor automatico caso queira