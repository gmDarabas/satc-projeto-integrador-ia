import Home from "@/pages/home";
import { Route } from "react-router-dom";
import NotFoundRedirect from "./not-found-redirect";
import AnimaisPage from "@/pages/animal";
import SintomasPage from "@/pages/sintomas";
import SintomaDetalhePage from "@/pages/sintomas/sintoma-detalhe";
import Layout from "@/pages/layout";

export default function UserRoutes() {
  return (
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/cadastrar-sintoma" element={<SintomasPage />} />
      <Route path="/animal/:animalId/informacoes" element={<AnimaisPage />} />
      <Route path="/animal/:animalId/cadastrar-sintoma" element={<SintomasPage />} />
      <Route path="/sintoma/:id" element={<SintomaDetalhePage />} />
      <Route path="*" element={<NotFoundRedirect to="/" />} />
    </Route>
  );
}
