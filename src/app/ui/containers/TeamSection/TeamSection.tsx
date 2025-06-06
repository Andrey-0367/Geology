import { getTeam } from "@/api/team";
import { TeamSectionClient } from "./TeamSectionClient";

export default async function TeamSection() {
  const data = await getTeam();
  return <TeamSectionClient data={data} />;
}