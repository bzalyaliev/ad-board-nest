import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ad {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public contact: string;

  @Column()
  public picture: string;

  @Column({ default: true })
  public isActive: boolean;

}
export default Ad;
