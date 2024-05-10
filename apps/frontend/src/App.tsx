import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./components/auth-context";
import Router from "./routes";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 5 * 1000, // cache de 5 minutos para queries
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router />
        <Toaster />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
