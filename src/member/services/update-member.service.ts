import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../member.entity';

export namespace UpdateMember {
  @Injectable()
  export class Handler {
    constructor(
      @InjectRepository(Member)
      private memberRepository: Repository<Member>,
    ) {}
  
    async run(id: string, member: Request): Promise<Response> {
      await this.memberRepository.update(id, member);
      var updatedMember = await this.memberRepository.findOneBy({ id: parseInt(id) });
      return new Response(updatedMember);
    }
  }

  export class Response {
    constructor(member: Member) {
      this.id = member.id;
      this.name = member.name;
      this.gender = member.gender;
      this.age = member.age;
    }
    id: number;
    name: string;
    gender: string;
    age: number;
  }

  export class Request {
    name: string;
    gender: string;
    age: number;
  }
}
