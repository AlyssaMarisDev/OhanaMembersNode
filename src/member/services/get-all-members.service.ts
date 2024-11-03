import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../member.entity';

export namespace GetAllMembers {
  @Injectable()
  export class Handler {
    constructor(
      @InjectRepository(Member)
      private memberRepository: Repository<Member>,
    ) {}
  
    async run(): Promise<Response[]> {
      var members = await this.memberRepository.find();
      return members.map((member) => new Response(member));
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
}
