"use client";

import Image from "next/image";
import styles from "./TeamDetails.module.scss";
import { TeamMember } from "../CardTeam/CardTeam";


interface TeamDetailsProps {
  member: TeamMember;
}

export const TeamDetails = ({ member }: TeamDetailsProps) => {
  return (
    <article className={styles.details}>
      <div className={styles.imageContainer}>
        <Image
          src={member.employeePictureUrl}
          alt={member.employeeFullName}
          width={400}
          height={500}
          className={styles.image}
          priority
        />
      </div>
      
      <div className={styles.content}>
        
        <ul className={styles.positions}>
          {member.employeePositionsList.map((position, index) => (
            <li key={index} className={styles.position}>
              {position}
            </li>
          ))}
        </ul>

        {member.bio && (
          <div className={styles.bio}>
            {member.bio.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};