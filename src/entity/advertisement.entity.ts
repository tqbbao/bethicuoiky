import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('advertisement')
export class Advertisement {
  @PrimaryColumn({
    type: 'smallint',
    name: 'advertisement_id',
    unsigned: true,
  })
  advertisementId: number;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('varchar', { name: 'description', length: 255 })
  description: string;

  @Column('bigint', { name: 'user_id', unsigned: true })
  price: number;

  @Column('timestamp', { name: 'start_date', nullable: true })
  startDate: Date;

  @Column('timestamp', { name: 'end_date', nullable: true })
  endDate: Date;

  @Column('decimal', { name: 'latitude', precision: 10, scale: 6 })
  latitude: number;
  
  @Column('decimal', { name: 'longitude', precision: 10, scale: 6 })
  longitude: number;

  @Column('boolean', { name: 'is_active', default: false })
  isActive: boolean;

  @Column('boolean', { name: 'is_approved', default: false })
  isApproved: boolean;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;
}
