import { useToast } from "@/components/ui/use-toast";
import { Navigate } from "react-router-dom";

interface Props {
  to: string;
}

export default function NotFoundRedirect({ to }: Props) {
  const { toast } = useToast();
  toast({ title: "Página não encontrada", description: "Voltando à página inicial" });
  return (
    <>
      <Navigate to={to} replace />
    </>
  );
}
