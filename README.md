# Projeto integrador - Inteligência Articifial

## Projeto: <b>PetCare</b>

<div align="center">
[Logo PetCare](https://github.com/gmDarabas/satc-projeto-integrador-ia/blob/main/petcare.png)
</div>
  
<br>

## Integrantes
* [Alex Farias](https://github.com/Alex-Farias)
* [Guilherme Machado Darabas](https://github.com/gmdarabas)
* [Paulo Roberto Simão](https://github.com/paulorsimao)
* [Stephan  Anthony  Marques](https://github.com/stephan-anthony)


<br>

## Descrição do Projeto

<p style="text-indent: 5px; margin-left:10px;">
Uma aplicação móvel com o propósito de oferecer suporte aos proprietários de animais de estimação na gestão da saúde e do bem-estar de seus companheiros. O aplicativo possibilita que os usuários registrem informações detalhadas sobre seus animais de estimação, bem como raça, porte, idade e os sintomas que estes apresentam. Com base nesses dados, a aplicação fica responsável por fornecer orientação e possíveis diagnósticos preliminares para os sintomas manifestados.
</p>

<br>

## Objetivo

<p style="text-indent: 5px; margin-left:10px;">
Atualmente, pais de pet enfrentam uma dificuldade significativa ao buscar respostas confiáveis e rápidas para os problemas de saúde de seus pets. A vasta quantidade de informações disponíveis na internet nem sempre é precisa ou confiável. Então nosso objetivo é trazer respostas o mais precisa possível juntamente com o pet-shop/veterinário mais perto.
</p>

<br>

## Estrutura do Projeto

* Tela de Login
* Tela de cadastro de PET's
* Tela de Sintomas
* Tela de Animais

<br>

## Público Alvo
<p style="text-indent: 5px; margin-left:10px;">
Nosso público alvo é donos dee PET, mas a cliente em questão é Lara Sartor Aguiar que é uma "mãe de pet" e possui a Babi, sua cachorrinha que vem apresentando diversos problemas de comportamento e saúde por conta de sua idade avançada. Lara relatou também que Babi vem apresentando estranho comportamento ao urinar em locais inconsistentes da casa onde vivem e sobre a preocupação referente ao peso de sua amiguinha. Por conta do dia a dia cheio com trabalho e faculdade, Lara não consegue prestar toda a atenção necessária que um pet necessita e comentou que caso obtivesse uma certa ajuda/auxílio com alguma solução prática de fácil utilização no dia a dia ajudaria não só ela, mas também diversos conhecidos e amigos dela que em outros momentos compartilharam das mesmas preocupações.
</p>

<br>

## Tecnologias

* NestJS
* OpenAi
* PostgreSQL
* React

<br>



## Rodar o Projeto

O projeto utiliza `Turbo js` para rodar o backend e frontend simultaneamente

- Crie a `.env` dentro de cada projeto da pasta `./apps` e depois rode os comandos abaixo para rodar o projeto

```bash
# Baixar dependencias
npm i

# Rodar backend e front
npm run dev

# Caso queira rodar apenas o backend
npm run dev:back
```

Caso nao possua postgres instalado na máquina, é possível iniciar um container docker com o comando abaixo
`docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres`

## Configurando VSCode

- Baixar a extensão `Eslint`
- Baixar a extensão `Prettier`
- Para formatar o código automaticamente e manter o padrão do projeto aperte `ctrl+shift+p` e pesquise por `Open User Settings`,
  depois adicione as seguintes configurações no arquivo

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```
