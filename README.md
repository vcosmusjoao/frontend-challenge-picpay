# Frontend Challenge - PicPay

Este projeto foi desenvolvido como parte do processo seletivo da PicPay para a posição de Desenvolvedor Frontend Júnior. Ele consiste em uma aplicação web desenvolvida com Angular e PrimeNG.

⚙️ Tecnologias utilizadas
- Angular: 13.3.x
- PrimeNG: 13.1.x
- RxJS: 7.5.x
- TypeScript: 4.6.x
- Node.js: 12.x ou superior

🚀 Como rodar o projeto

Pré-requisitos
- Node.js instalado.
- Angular CLI instalado globalmente:
```javascript
npm install -g @angular/cli@13.3.11
```


# Passo a passo para rodar localmente
- Clone o repositório:
```javascript
git clone https://github.com/vcosmusjoao/frontend-challenge-picpay/
cd frontend-challenge-picpay
```
- Instale as dependências:
```javascript
npm install
```
- Inicie o servidor de desenvolvimento:
```javascript
ng serve
```
A aplicação estará disponível em: http://localhost:4200

🔍 Funcionalidades
- Login:
  Tela para realizar o login
- Gerenciador de usuários
   Tela para consulta, edição, exclusão e criação de novos usuários.
- Dashboard em Grid com Filtros Dinâmicos:
    Tabela interativa onde é possível filtrar dados,ordená-los, consultar, editar, excluir e criar novas tasks.
- Responsividade:
    Interface otimizada para desktop e dispositivos móveis.
- Sessão :
    Foi utilizado Local Storage para armazenar 
- Validações:
    Foi utilizados toasts para fornecer feedback imediato em diversas situações, incluindo erros de preenchimento, confirmações de sucesso e avisos importantes. Esses toasts  melhoram a experiência do usuário e também asseguram uma interação clara e eficiente com a aplicação.
- Sessão do usuário:
  Foi implementando via Local Storage um tempo de 5 minutos por sessão, onde o usuário é avisado 30 segundos antes e após isso a aplicaçãor retorna pro login, trazendo um pouco mais da realidade de sistemas mais robustos que contam com validação de tempo de sessão. Além disso o Local Storage também foi utilizado para guardar as informações do usuário logado.

  
✅ Boas práticas seguidas
- Commits Semânticos: Os commits seguem uma estrutura clara e descritiva.
- Modularização: Componentes reutilizáveis para facilitar a manutenção.
- Uso de PrimeNG: Biblioteca rica de componentes para interfaces modernas.
- Responsividade: A aplicação é adaptada para diferentes tamanhos de tela com utilização do Flex-box.



🔄 Rotas da Aplicação
| Rotas      | Descrição
|------------|----------
| /login     | Tela de login de usuário  
| /dashboard | Tela com grids dinâmicos de tasks e CRUD dos registros.
| /users     | Tela com grid de usuários e CRUD dos registros.


📦 Dependências Principais
- PrimeNG: Componentes visuais prontos para Angular.
- RxJS: Manipulação de fluxos assíncronos.
- Angular Forms: Gerenciamento de formulários reativos.

✅ Evidências das telas e operações
![GIF](https://github.com/vcosmusjoao/frontend-challenge-picpay/blob/master/steps_challenge.gif?raw=true)



# 👨‍💻 Autor
Desenvolvido por João Victor.
[LinkedIn] (https://www.linkedin.com/in/joaovcsantos/) | [GitHub] (https://github.com/seu-perfil)
