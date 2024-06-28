export default function SobreNosPage() {
  return (
    <>
      <div className="container mx-auto p-6 mb-10">
        <h1 className="text-4xl font-bold mb-4 text-center">Sobre Nós</h1>
        <div>
          <div className="flex items-center justify-center h-full">
            <img className="flex align-middle max-h-[300px]" src="./cachorro.svg" alt="Centered Image"></img>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Bem-vindo ao PetCare!</h2>
          <p>
            Nosso aplicativo foi criado com o objetivo de revolucionar o cuidado com a saúde dos pets. Entendemos a
            importância de um diagnóstico rápido e preciso para garantir o bem-estar dos seus companheiros de quatro
            patas. Por isso, utilizamos a tecnologia de Inteligência Artificial para fornecer pré-diagnósticos baseados
            nos sintomas informados por você.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Nossa Missão</h2>
          <p>
            Nossa missão é ajudar donos de pets a cuidar melhor dos seus animais, proporcionando informações e
            orientações de saúde de forma rápida e acessível. Queremos que você se sinta confiante e bem informado sobre
            a saúde do seu pet, sempre que precisar.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Como Funciona</h2>
          <p>
            Nosso processo é simples e intuitivo. Você informa os dados do seu pet e os sintomas que ele está
            apresentando. Nossa IA analisa essas informações e fornece um pré-diagnóstico, ajudando você a entender
            melhor o que pode estar acontecendo com seu pet e quais são os próximos passos recomendados.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Nossa Equipe</h2>
          <p>
            Este aplicativo é um projeto de faculdade desenvolvido por alunos da UNISATC. Nosso objetivo é aplicar
            nossos conhecimentos acadêmicos para criar uma ferramenta útil e que possa fazer a diferença na comunidade.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Juntos pelo Bem-Estar dos Pets</h2>
          <p>
            Estamos comprometidos em oferecer um serviço que faça a diferença na vida dos pets e de seus donos. Com sua
            confiança, continuaremos a melhorar e expandir nossas funcionalidades para atender cada vez melhor às suas
            necessidades.
          </p>
        </section>
      </div>
    </>
  );
}
