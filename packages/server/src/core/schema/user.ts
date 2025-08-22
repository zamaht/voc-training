import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';
import { z } from 'zod';

const UserId = z.string().uuid().brand('user_id');
export type UserId = z.infer<typeof UserId>;

type User = Readonly<{
    id: UserId;
    firstName: string;
    lastName: string;
}>;

@Entity('user', { schema: 'public' })
export class UserSchema extends BaseEntity {
    @PrimaryColumn()
    id: UserId;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    constructor({ firstName, id, lastName }: User) {
        super();

        this.firstName = firstName;
        this.id = id;
        this.lastName = lastName;
    }
}
