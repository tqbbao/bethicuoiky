import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('advertisement')
export class Advertisement {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'advertisement_id',
    unsigned: true,
  })
  advertisementId: number;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('varchar', { name: 'description', length: 255 })
  description: string;

  @Column('bigint', { name: 'price', unsigned: true })
  price: number;

  @Column('decimal', { name: 'height', precision: 10, scale: 2 })
  height: number;
  
  @Column('decimal', { name: 'width', precision: 10, scale: 2 })
  width: number;

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

  @Column('timestamp', { name: 'create_update', default: () => 'CURRENT_TIMESTAMP' })
  createUpdate: Date;


}
