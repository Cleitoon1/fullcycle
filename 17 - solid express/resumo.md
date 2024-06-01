SOLID é um acrônimo que consolida 5 itens que são considerados como boas prática no mundo do desenvolvimento orientados a objetos

de onde surgiu ?, primeira referência no livro Agile Software Development - Robert C. Martin (Uncle Bob)

SOLID:
 - Single Responsability Principle(S): Princípio da Responsabilidade Única, uma classe deve ter um e apenas um motivo para mudar, caso essa classe tenha mais motivos essa classe provavelmente tem mais de uma responsabilidade e deve ser quebrada
 - Open Closed Principle(O): Princípio Aberto-Fechado, toda classe deve ser aberta para extensão e fechada para modificação, ou seja quando precisamos adicionar novos comportamentos no código invés de alterar a classe original e sim fazer uma extensão dela
 - Liskov Substitution Principle(L): Princípio da substituição de Liskov, subclasses podem ser substituídas por suas classes pai, uma classe filha deve poder ser substituída pela sua classe pai sem que tenham problemas
 - Interface Segretation Principle(I): Princípio da Segregação da Interface, uma classe não é obrigada a implementar interfaces e métodos que ela não utilizará, em resumo o princípio diz que é melhor criar interfaces específicas do que termos uma unica genérica
 - Dependency Inversion Principle(D): Princípio da Inversão de Dependência, dependa de abstrações e não de implementações, ou seja trabalhar com interface e não com implementações


código de exemplo https://github.com/devfullcycle/fc3-solid-express/tree/main
um resumo legal https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530