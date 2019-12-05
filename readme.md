### Instruções

### Desafio

Concluir os seguintes cursos na freecodecamp, e mandar o print de conclusão: 

[Introduction to Quality Assurance with Chai](https://www.freecodecamp.org/learn/information-security-and-quality-assurance/quality-assurance-and-testing-with-chai/)

### SMS

Um dos serviços mais utilizados pelos usuários de aparelhos celulares são os SMS (Short Message Service), que permite o envio de mensagens curtas (até 255 caracteres em redes GSM e 160 caracteres em redes CDMA).

Para digitar uma mensagem em um aparelho que não possui um teclado QWERTY embutido é necessário fazer algumas combinações das 10 teclas numéricas do aparelho para conseguir digitar. Cada número é associado a um conjunto de letras como a seguir:

| Letras | Número |
|--------|--------|
| ABC    | 2      |
| DEF    | 3      |
| GHI    | 4      |
| JKL    | 5      |
| MNO    | 6      |
| PQRS   | 7      |
| TUV    | 8      |
| WXYZ   | 9      |
| Espaço | 0      |

Desenvolva um programa que:
1. Dada uma mensagem de texto limitada a 255 caracteres, retorne a seqüência de números que precisa ser digitada. 
2. Dada uma sequencia de números retorne o texto

Caso uma sequencia use a mesma tecla, deve ser usada “_” para separar.

Por exemplo, para digitar "TESTE DE MESA", você precisa digitar:
833777783303_33063377772

### Requisitos

Desenvolver um programa conforme o desafio detalhado abaixo

- Considere a criação de uma arquivo readme.md para descrever como implantar e executar a aplicação.
- Faça testes unitários.
- A aplicação deverá ter o rastreamento do que o usuário realizou no sistema (salve no mongodb e liste o resultado de todas as SMS no front).
- Criar uma API em NodeJS com MongoDB / mongoose (documentar usando swagger)
- Criar um Cliente em React + Redux consumindo esta API (disparando as ações para a API e atualizando a listagem pegando as informações do Back)
- Requerido Implementar tudo em ES6
- Colocar o código no GITHUB e nos mandar a URL
- Arquitetura, Frameworks, organização de arquivos e Endpoints da API estão livres para implementar conforme julgar mais adequado.

### Itens a serem avaliados:

- Cobertura dos testes unitários
- Organização das resposabilidades
- Estrutura do Código
- Código Limpo
- Integração Contínua (travis ou qualquer outro CI básico)