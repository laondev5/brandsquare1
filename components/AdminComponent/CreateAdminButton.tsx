import Link from "next/link";
import { Button } from "../ui/button";

export function CreateAdminButton() {
  return (
    <Link href="/admin/create-admin">
      <Button>Create New Admin</Button>
    </Link>
  );
}
