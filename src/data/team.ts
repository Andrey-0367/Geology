import { TeamMember } from "@/app/ui/components/CardTeam/CardTeam";

export const mockTeam: TeamMember[] = [
  {
    id: 1,
    employeeFullName: "Иванов Иван Иванович",
    employeePictureUrl: "/Geology/images/team/1.jpg",
    employeePositionsList: ["Главный геолог", "Кандидат наук"],
    employeeProfileLink: "/team/1",
    bio: `Опыт работы: 8 лет Образование: СПбГУ Курсы повышения квалификации: 2022г.`,
  },
  {
    id: 2,
    employeeFullName: "Петрова Мария Сергеевна",
    employeePictureUrl: "/Geology/images/team/2.jpg",
    employeePositionsList: ["Главный бухгалтер"],
    employeeProfileLink: "/team/2",
  },
  {
    id: 3,
    employeeFullName: "Сидооров Иван Потапович",
    employeePictureUrl: "/Geology/images/team/3.jpg",
    employeePositionsList: ["Главный инженер", "Кандидат наук"],
    employeeProfileLink: "/team/3",
  },
  {
    id: 4,
    employeeFullName: "Петрова Мария Сергеевна",
    employeePictureUrl: "/Geology/images/team/4.jpg",
    employeePositionsList: ["Старший инженер-геолог"],
    employeeProfileLink: "/team/4",
    bio: `Опыт работы: 10 лет Образование: МГУ им. ЛомоносоваСпециализация: Геология нефти и газа`,
  },
  {
    id: 5,
    employeeFullName: "Рабинович Яков Моисеевич",
    employeePictureUrl: "/Geology/images/team/5.jpg",
    employeePositionsList: ["Буровой мастер", "Кандидат наук"],
    employeeProfileLink: "/team/5",
  },
  {
    id: 6,
    employeeFullName: "Лютый Кондратий Осипович",
    employeePictureUrl: "/Geology/images/team/6.jpg",
    employeePositionsList: ["Помошник бурового мастера"],
    employeeProfileLink: "/team/6",
  },
];
