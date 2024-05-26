import Home from "@/pages/home";
import { Route } from "react-router-dom";
import NotFoundRedirect from "./not-found-redirect";
import NovoSintoma from "@/pages/sintomas/novo-sintoma";
import SintomaDetalhePage from "@/pages/sintomas/sintoma-detalhe";
import Layout from "@/pages/layout";
import AnimalDetalhesPage from "@/pages/animais/animal-detalhe-page";
import ListaSintomasPage from "@/pages/sintomas/lista-sintomas";

export default function UserRoutes() {
  return (
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/cadastrar-sintoma" element={<NovoSintoma />} />
      <Route path="/animal/:animalId/informacoes" element={<AnimalDetalhesPage />} />
      <Route path="/animal/:animalId/cadastrar-sintoma" element={<NovoSintoma />} />
      <Route path="/animal/:animalId/sintomas" element={<ListaSintomasPage />} />
      <Route path="/sintoma/:id" element={<SintomaDetalhePage />} />
      <Route path="*" element={<NotFoundRedirect to="/" />} />
    </Route>
  );
}
