import { Entity, ObjectID, ObjetcIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('deals')
export class Deal {

  @ObjetcIdColumn()
  id: ObjectID

  @Column()
  deal_id: number

  @Column()
  title: string

  @Column()
  org_name: string

  @Column()
  value: number

  @Column()
  cc_email: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string

}
