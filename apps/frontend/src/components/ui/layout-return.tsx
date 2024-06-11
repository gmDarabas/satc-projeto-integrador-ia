import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export default function ArrowReturn() {
  const navigate = useNavigate();

  const handleReturn = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      console.log("Sem histórico de paginação");
    }
  };

  return (
    <div onClick={handleReturn} className="cursor-pointer">
      <ArrowLeftIcon className="size-6 ml-2" />
    </div>
  );
}
