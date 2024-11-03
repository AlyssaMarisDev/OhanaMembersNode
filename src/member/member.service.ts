import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async create(member: Member): Promise<Member> {
    return await this.memberRepository.save(member);
  }

  async remove(id: string): Promise<void> {
    var result = await this.memberRepository.delete(id);
    console.log(result);
  }
}
