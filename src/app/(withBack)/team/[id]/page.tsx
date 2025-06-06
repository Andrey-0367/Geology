import { notFound } from 'next/navigation';
import styles from "./page.module.scss";
import { TeamDetails } from '@/app/ui/components/TeamDetails/TeamDetails';
import { Title } from '@/components/Title/Title';
import { getEmployeeData, getTeam } from '@/api/team';



export async function generateStaticParams() {
  try {
    const team = await getTeam();
    
    return team.map(member => ({
      id: member.id.toString(),
    }));
  } catch (error) {
    console.error('Ошибка при генерации статических параметров:', error);
    return [];
  }
}

export default async function TeamPageDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {

    const { id } = await params;
    const numericId = Number(id);
    
    if (isNaN(numericId)) return notFound();

     const member = await getEmployeeData(id);
    if (!member) return notFound();

    return (
      <div className={styles.container}>
        <Title tag="h1">{member.full_name}</Title>
        <TeamDetails member={member} />
      </div>
    );
    
  } catch (error) {
    console.error('Error loading team member details:', error);
    return notFound();
  }
}