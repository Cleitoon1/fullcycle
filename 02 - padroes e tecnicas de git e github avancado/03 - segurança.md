Assinatura de commit utilizando chaves GPG

`apt-get install gpg` - instalar o gpg
`gpg --list-secret-key --keyid-form LONG`verificar se chave criada
`gpg --full-generate-key` prompt com passo a passo das config, tipo, tamanho, validade, nome(tem que ser igual ao do nome configurado no git global.user.name) e etc
chave gerada em
`gpg --armor --export 1CF6AA84205A4543` - vai gerar a chave ssl para utilizarmos no github, adicionar a chave igual adiciona SSL, mas GPG
`git config --global user.signingkey 1CF6AA84205A4543` - comando para configurar a chave para ser utilizda via git
`export GPG_TTY=$(tty)` variavel de ambiente necessária, colocar essa linha no arquivo `~/.bash_profile.sh`
`git config commit.gpgsign true` vai fazer com que os commits do repositório em que estou seja obrigatório para que isso seja feito em todas adicionar a flag `--global`
`git config tag.gpgsign true` o mesmo só que para tag
`git commit -S -m "adicionar html de teste"` o -S é para assinar aquele commit isoladamente
`gpg --edit-key 1CF6AA84205A4543` editar a chave, exemplo: adicionar mais um contato naquela chave caso de ter 2 emails, digitar comando `adduid` e preencher as informações de acordo com o prompt `save`para encerrar a edição