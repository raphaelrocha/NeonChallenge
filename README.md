# NeonChallenge

Descrição

Este é um aplicativo de testes para mostrar minhas habilidades sobre o desenvolvimento de aplicações móveis multiplataforma usando react-native

Sobre a api REST

Os dados do usuário logado e dos seus contatos são todos fiquitícios porém não estão estáticos no app. 
Para ter dados de pessoas usei a api "https://randomuser.me/"

Os dados do pefil são carregados de: 
GET - https://randomuser.me/api/?nat=br
Essa rota retorna um array com apenas um objeto que assumo ser o usuário dono da conta.

Os dados dos contatos são carregados de: 
GET - https://randomuser.me/api/?results=20&nat=br
Essa rota retorna um array com 20 objetos que assumo serem os contatos do usuário.

Para simular uma chamada de api para realição da transferência dos valores, eu precisei usar uma api de testes que aceitasse chamadas POST, para isso usei a api "https://jsonplaceholder.typicode.com/"
POST - "https://jsonplaceholder.typicode.com/posts" 
Essa rota, apesar de aceitar os dados enviados no body da requisição, não faz nada retornando apenas um sucesso com código 200 com um id.

Toda a lógica que deveria ser executada no back-end foi concentrada no pacote src/__mocks__

Sobre o APP

App
O app foi desenvolvido usando o framework react-native 0.61.2
Para facilitação do desenvolvimento, foram adicionados ao projeto algumas bibliotecas.

Requisições HTTP
"http-status-codes": "^1.3.2",
"react-native-cancelable-fetch": "^0.1.1",

Tradução
"i18n-js": "^3.3.0",

Campos com mascaramento adequado para dinheiro.
"react-native-masked-text": "^1.13.0",

Transição de telas e navegação
"react-navigation": "^4.0.10",
"react-navigation-stack": "^1.9.4" 
"react-native-gesture-handler": "^1.4.1",

Utilidades
"lodash": "^4.17.15",

Sobre o app.

O app possui três telas que permitem o usuário "loogado" ver sua lista de contatos e realizar transferências de valores para qualquer um deles.

Tela inicial Perfil
Nesta tela você verá a foto do usuário loagado bem como seu nome, seu e-mail e dois botões de ações para enviar dinheiro e ver as transferencias previamente realizadas.
Uma vez aberto o app, ele irá buscar os dados do suposto usuário logado na api randomuser.me. Uma vez baixado o usuário, o mesmo permanece salvo no armazenamento local. Caso você deseje mudar de usuário, basta fazer o gesto de pull to refresh nesta tela, neste momento o usuário antigo e seus registros serão apagados para dar espaço aos dados e registros do novo usuário baixado.




