import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { dayjs } from "../lib/format-relative-date";
import { useRooms } from "./http/use-rooms";

export function RoomList() {
  const { data, isLoading } = useRooms();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>
          Acesso rapido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando Salas...</p>
        )}
        {data?.map((room) => {
          return (
            <Link
              to={`/room/${room.id}`}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
              key={room.id}
            >
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    {room.questionsCount} pergunta(s)
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    {dayjs(room.createdAt).toNow()}
                  </Badge>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
