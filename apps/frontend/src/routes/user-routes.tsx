import Home from "@/pages/home";
import { Route } from "react-router-dom";
import NotFoundRedirect from "./not-found-redirect";
import NovoSintoma from "@/pages/sintomas/novo-sintoma";
import SintomaDetalhePage from "@/pages/sintomas/sintoma-detalhe";
import Layout from "@/pages/layout";
import AnimalDetalhesPage from "@/pages/animais/animal-detalhe-page";
import ListaSintomasPage from "@/pages/sintomas/lista-sintomas";
import ListaAnimais from "@/pages/animais/components/lista-animais";
import { MenuItem } from "@/components/ui/menu-bar";
import { HomeIcon, InfoCircledIcon, PersonIcon, ExitIcon } from "@radix-ui/react-icons";
import { Logout } from "@/pages/auth/logout";
import PerfilPage from "@/pages/perfil/perfil-page";
import SobreNosPage from "@/pages/sobre-nos";

const MenuIcon = ({ Icon }: any) => <Icon width={24} height={24} className="mb-1" />;

const menuItems: MenuItem[] = [
  { key: "/", icon: <MenuIcon Icon={HomeIcon} />, label: "Início" },
  { key: "/perfil", icon: <MenuIcon Icon={PersonIcon} />, label: "Perfil" },
  { key: "/sobre-nos", icon: <MenuIcon Icon={InfoCircledIcon} />, label: "Sobre Nós" },
  { key: "logout", icon: <MenuIcon Icon={ExitIcon} />, label: "Sair" },
];

export default function UserRoutes() {
  return (
    <Route element={<Layout menuItems={menuItems} />}>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="/cadastrar-sintoma" element={<NovoSintoma />} />
      <Route path="/animal/:animalId/informacoes" element={<AnimalDetalhesPage />} />
      <Route path="/animal/:animalId/cadastrar-sintoma" element={<NovoSintoma />} />
      <Route path="/animal/:animalId/cadastrar-animal" element={<ListaAnimais />} />
      <Route path="/animal/:animalId/sintomas" element={<ListaSintomasPage />} />
      <Route path="/sintoma/:id" element={<SintomaDetalhePage />} />
      <Route path="/sobre-nos" element={<SobreNosPage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFoundRedirect to="/" />} />
    </Route>
  );
}
