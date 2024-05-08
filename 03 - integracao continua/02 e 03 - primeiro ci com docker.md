Arquivo na na pasta .github/workflow/introducao-ci.yaml
gerei um token no docker hub e adicionei nos secrets do repositório para o yaml fazer o gerar a imagem e atualizar no dockerhub
no github adicionar política de branch de status check ou seja não irá permitir merge na main de branch que está falhando nos build
Require Status check to pass
Matrix: verificando a aplicação em versões diferentes do sistema, muito foda, para testar retrocompatibilidade e talz

alterações que fiz que ficou diferente do curso, não fiz um repo só para o módulo, coloquei no push da branch `develop/modulo-integracao-continua` e alterei tbm o path padrão o path do projeto na pasta geral, ficou bem legal, mas em resumo é igual  