import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHash } from 'src/user/interfaces/user.interfaces';

@Injectable()
export class Helper {
  async hashPassword(password: string): Promise<PasswordHash> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
