#!/usr/bin/env node
import { program } from 'commander';
import { CommandInvoker } from './commands/commands-invoker';
import { PrismaCommand } from './commands/prisma.command';

function bootstrap() {
  const invoker = new CommandInvoker();

  const commands = [PrismaCommand];

  commands.map((commandClass) => invoker.addCommand(new commandClass()));

  invoker.executeCommands(program);
  program.parse(process.argv);
}

bootstrap();
