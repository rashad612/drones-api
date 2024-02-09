import { MigrationInterface, QueryRunner } from "typeorm";
import { Drone } from '../drone/entities/drone.entity';
import { Medication } from '../medication/entities/medication.entity';
import { DRONE_MODELS, DRONE_STATES } from "src/drone/drone.constants";

export class Seeds1707462445714 implements MigrationInterface {
    name = 'Seeds1707462445714'

    public async up(queryRunner: QueryRunner): Promise<void> {
      const firstDrones = [
        {
          serial_number: 'Drone 1',
          model: DRONE_MODELS.CRUISE,
          weight_limit: 10,
          battery: 24,
          state: DRONE_STATES.IDLE,
        },
        {
          serial_number: 'Drone 2',
          model: DRONE_MODELS.MIDDLE,
          weight_limit: 4,
          battery: 10,
          state: DRONE_STATES.IDLE,
        },
        {
          serial_number: 'Drone 3',
          model: DRONE_MODELS.LIGHT,
          weight_limit: 1,
          battery: 100,
          state: DRONE_STATES.IDLE,
        },
        {
          serial_number: 'Drone 4',
          model: DRONE_MODELS.MIDDLE,
          weight_limit: 5,
          battery: 45,
          state: DRONE_STATES.IDLE,
        },
        {
          serial_number: 'Drone 5',
          model: DRONE_MODELS.MIDDLE,
          weight_limit: 3,
          battery: 66,
          state: DRONE_STATES.IDLE,
        },
        {
          serial_number: 'Drone 6',
          model: DRONE_MODELS.LIGHT,
          weight_limit: 1,
          battery: 79,
          state: DRONE_STATES.IDLE,
        },
        {
          serial_number: 'Drone 7',
          model: DRONE_MODELS.CRUISE,
          weight_limit: 10,
          battery: 28,
          state: DRONE_STATES.IDLE,
        },
        {
          serial_number: 'Drone 8',
          model: DRONE_MODELS.MIDDLE,
          weight_limit: 5,
          battery: 99,
          state: DRONE_STATES.IDLE,
        },
        {
          serial_number: 'Drone 9',
          model: DRONE_MODELS.HEAVY,
          weight_limit: 10,
          battery: 90,
          state: DRONE_STATES.IDLE,
        },
        {
          serial_number: 'Drone 10',
          model: DRONE_MODELS.HEAVY,
          weight_limit: 10,
          battery: 88,
          state: DRONE_STATES.IDLE,
        },
      ];

      const firstMedications = [
        {
          name: 'ABc_01',
          weight: 11,
          code: 'ABC_01',
          image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462',
        },
        {
          name: 'second-02',
          weight: 2,
          code: 'SEC02',
          image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462',
        },
        {
          name: 'ThrEE-03',
          weight: 10,
          code: 'TH3',
          image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462',
        },
        {
          name: 'F4',
          weight: 6,
          code: 'F04',
          image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462',
        },
        {
          name: 'Five',
          weight: 20,
          code: 'F05',
          image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462',
        },
      ];
      
      await Promise.all(firstDrones.map(async (d) => {
        const newDrone = queryRunner.manager.create(Drone);
        await queryRunner.manager.save(
          queryRunner.manager.merge(Drone, newDrone, d),
        );
      }));

      await Promise.all(firstMedications.map(async (m) => {
        const newMed = queryRunner.manager.create(Medication);
        await queryRunner.manager.save(
          queryRunner.manager.merge(Medication, newMed, m),
        );
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
