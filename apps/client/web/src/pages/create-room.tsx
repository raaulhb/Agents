import { RoomList } from "@/components/room-list";
import { CreateRoomForm } from "@/components/create-room-form";

export function CreateRoom() {
  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 grid-cols-2 items-start gap-8">
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </div>
  );
}
