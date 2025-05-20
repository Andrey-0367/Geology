import { notFound } from 'next/navigation';
import styles from "./page.module.scss";
import { mockTeam } from '@/data/team';
import { TeamDetails } from '@/app/ui/components/TeamDetails/TeamDetails';
import { Title } from '@/components/Title/Title';

export interface TeamMember {
  id: number;
  employeeFullName: string;
  employeePictureUrl: string;
  employeePositionsList: string[];
  employeeProfileLink: string;
}

async function getTeamMember(id: number): Promise<TeamMember | undefined> {
  return mockTeam.find(member => member.id === id);
}

export async function generateStaticParams() {
  return mockTeam.map(member => ({
    id: member.id.toString(),
  }));
}

export default async function TeamPageDetails({
  params,
}: {
  params: { id: string };
}) {
  try {

    const { id } = await params;
    const numericId = Number(id);
    
    if (isNaN(numericId)) return notFound();

    const member = await getTeamMember(numericId);

    if (!member) return notFound();

    return (
      <div className={styles.container}>
        <Title tag="h1">{member.employeeFullName}</Title>
        <TeamDetails member={member} />
      </div>
    );
    
  } catch (error) {
    console.error('Error loading team member details:', error);
    return notFound();
  }
}