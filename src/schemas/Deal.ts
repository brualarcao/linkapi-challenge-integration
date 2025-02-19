import { Entity, ObjectID, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'

@Entity('deals')
export class Deal {

 @PrimaryColumn()
 deal_id: number

 @Column()
 owner_name: string

 @Column()
 contact: string

 @Column()
 won_time: string

 @Column()
 contact_email: string

 @Column()
 contact_phone: string

 @Column()
 title: string

 @Column()
 org_name: string;

 @Column()
 value: number;

 @Column()
 cc_email: string

}
