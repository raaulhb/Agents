import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={<CreateRoom />}
            index
          />
          {/** biome-ignore assist/source/useSortedAttributes: <explanation> */}
          <Route
            path="/room/:roomId"
            element={<Room />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
