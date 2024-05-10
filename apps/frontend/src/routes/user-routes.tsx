import Home from "@/pages/home";
import { Route } from "react-router-dom";
import NotFoundRedirect from "./not-found-redirect";
import SintomasPage from "@/pages/sintomas";
import SintomaDetalhePage from "@/pages/sintomas/sintoma-detalhe";

export default function UserRoutes() {
  return (
    <Route /*element={<AdminLayout menuItens={menuItens} />}*/>
      <Route path="/" element={<Home />} />
      <Route path="/cadastrar-sintoma" element={<SintomasPage />} />
      <Route path="/animal/:animalId/cadastrar-sintoma" element={<SintomasPage />} />
      <Route path="/sintoma/:id" element={<SintomaDetalhePage />} />

      {/* <Route path='/home' element={<h1>Área do cliente</h1>} />
            <Route path='/consulta' element={<NovaConsulta />} />
            <Route path='/logout' element={<Logout></Logout>} />*/}
      <Route path="*" element={<NotFoundRedirect to="/" />} />
    </Route>
  );
}
