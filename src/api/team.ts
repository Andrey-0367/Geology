import { TeamMember } from '@/app/ui/components/CardTeam/CardTeam';
import { API } from './apiConfig';

export async function getTeam(): Promise<TeamMember[]> {
  try {
    const response = await fetch(API.employees.list, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.map((employee: any) => ({
      id: employee.id,
      full_name: employee.full_name,
      photo: employee.photo_url || "/default-avatar.jpg",
      positions: employee.positions || "",
      bio: employee.bio || "",
      profile_link: `/team/${employee.id}`,
    }));
  } catch (error) {
    console.error("Ошибка загрузки команды:", error);
    return []; 
  }
}

export async function getEmployeeData(id: string): Promise<TeamMember | null> {
  try {
    const response = await fetch(API.employees.detail(id), { 
      next: { revalidate: 60 } 
    });

    if (!response.ok) return null;
    
    const employee = await response.json();
    
    return {
      id: employee.id,
      full_name: employee.full_name,
      photo: employee.photo_url || "/default-avatar.jpg",
      positions: employee.positions || "",
      bio: employee.bio || "",
      profile_link: `/team/${employee.id}`,
    };
  } catch (error) {
    console.error(`Ошибка загрузки данных сотрудника ${id}:`, error);
    return null;
  }
}