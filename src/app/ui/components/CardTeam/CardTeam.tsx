import Link from "next/link";
import Image from "next/image";
import styles from "./CardTeam.module.scss";
import clsx from "clsx";

const slimCardPictureWidth = 270;
const slimCardPictureHeight = 334;
const wideCardPictureWidth = 262;
const wideCardPictureHeight = 349;

export interface TeamMember {
  id: number;
  employeeFullName: string;
  employeePictureUrl: string;
  employeePositionsList: string[];
  employeeProfileLink: string;
  bio?: string;
}

export interface CardTeamUIProps extends TeamMember {
  wideCard: boolean;
}

export const CardTeamUI = (props: CardTeamUIProps) => {
  if (!props || !props.id) {
    return <div className={styles.error}>Ошибка загрузки карточки</div>;
  }
  return (
    <Link href={`/team/${props.id}`}>
      <div
        className={clsx([
          styles.container,
          props.wideCard ? styles.wideCard : styles.slimCard,
        ])}
      >
        <div className={styles.mainInfoContainer}>
          <div
            className={clsx([
              styles.employeeImageContainer,
              props.wideCard
                ? styles.employeeImageContainerWideCard
                : styles.employeeImageContainerSlimCard,
            ])}
          >
            {props.employeePictureUrl ? (
              <div className={styles.imageWrapper}>
                <Image
                  src={props.employeePictureUrl}
                  alt={`Фотография ${props.employeeFullName}`}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className={styles.defaultAvatar}>
                {props.employeeFullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          <h2
            className={clsx([
              styles.employeeFullName,
              props.wideCard
                ? styles.employeeFullNameWideCard
                : styles.employeeFullNameSlimCard,
            ])}
          >
            {props.employeeFullName}
          </h2>
        </div>
        <ul className={styles.positionsList}>
          {props.employeePositionsList.map((position: string, index: any) => {
            return (
              <li
                key={`${props.id}-${position}-${index}`}
                className={styles.employeePosition}
              >
                {position}
              </li>
            );
          })}
        </ul>
      </div>
    </Link>
  );
};
