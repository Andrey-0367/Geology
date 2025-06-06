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
  full_name: string;
  photo: string | null;
  positions: string;
  bio: string;
  profile_link: string;
}

export interface CardTeamUIProps extends TeamMember {
  wideCard: boolean;
}

export const CardTeamUI = (props: CardTeamUIProps) => {
  if (!props || !props.id) {
    return <div className={styles.error}>Ошибка загрузки карточки</div>;
  }
  const decodedPhoto = props.photo ? decodeURIComponent(props.photo) : null;
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
            {decodedPhoto ? (
              <div className={styles.imageWrapper}>
                <Image
                  src={decodedPhoto}
                  alt={`Фотография ${props.full_name}`}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={true} 
                />
              </div>
            ) : (
              <div className={styles.defaultAvatar}>
                {props.full_name
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
            {props.full_name}
          </h2>
        </div>
        <div className={styles.positionsList}>
          <p className={styles.employeePosition}>{props.positions}</p>
        </div>
      </div>
    </Link>
  );
};
