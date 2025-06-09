"use client";

import Image from "next/image";
import styles from "./TeamDetails.module.scss";
import { TeamMember } from "../CardTeam/CardTeam";

interface TeamDetailsProps {
  member: TeamMember;
}

export const TeamDetails = ({ member }: TeamDetailsProps) => {
   const photoUrl = member.photo || "/images/skoro.jpg";
  return (
    <article className={styles.details}>
      <div className={styles.imageContainer}>
        <Image
          src={photoUrl} 
          alt={member.full_name}
          width={400}
          height={500}
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.content}>
        <p className={styles.positions}>{member.positions}</p>

        {member.bio && (
          <div className={styles.bio}>
            {member.bio.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};
