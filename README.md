# Loja Minsait — Sistema de Vendas Simplificado

Este projeto é um **sistema de vendas simplificado**, desenvolvido como parte de uma atividade.
O sistema permite **cadastro de produtos**, controle automático de **estoque**, gerenciamento de **carrinho de compras** e finalização de pedidos, construído com **Angular 20**, Signals e armazenamento em **localStorage / API**.

---

##  Tecnologias Utilizadas

- **Angular 20**
- **Angular Signals**
- **TypeScript**
- **SCSS**
- **LocalStorage**
- **API REST Java SpringBoot)**

---

##  Funcionalidades

###  Produtos
- ✔ Criar produto  
- ✔ Editar produto  
- ✔ Listar produtos  
- ✔ Excluir produto  
- ✔ Validações no formulário  
- ✔ Persistência via API (ProductService)

---

###  Carrinho
- ✔ Adicionar produto ao carrinho  
- ✔ Incrementar quantidade de itens  
- ✔ Remover itens  
- ✔ Limpar todo o carrinho  
- ✔ Cálculo automático do total  
- ✔ Finalização de pedido com feedback visual

---

###  Estoque
- ✔ Controle automático de estoque  
- ✔ Subtrai estoque ao adicionar ao carrinho  
- ✔ Reposição de estoque ao remover do carrinho  
- ✔ Persistência em **localStorage**  
- ✔ Estoque aplicado dinamicamente aos produtos exibidos

---

###  Outros Recursos
- ✔ Uso de **Angular Signals** para estado reativo  
- ✔ Componentes reutilizáveis (ex: Product Table)  
- ✔ Código organizado por serviços, modelos e páginas  

---

##  Instalação e Execução

###  **Rodar o projeto**

```bash
npm install
npm start

A aplicação ficará disponível em: http://localhost:4200

---

## Testes

### Para rodar testes unitários(Karma/Jasmine):

npm test




