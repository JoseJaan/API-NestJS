import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  location: string;

  @Column()
  goal: string;

  @Column()
  flagUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP AT TIME ZONE \'GMT-3\'' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP AT TIME ZONE \'GMT-3\'', onUpdate: 'CURRENT_TIMESTAMP AT TIME ZONE \'GMT-3\'' })
  updatedAt: Date;
}
