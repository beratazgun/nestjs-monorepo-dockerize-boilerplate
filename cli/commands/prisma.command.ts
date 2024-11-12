import { Command } from 'commander';
import { BaseCommand } from './base-command';
import { exec } from 'child_process';
import * as prompts from 'prompts';
import { isArray } from 'lodash';
import { bold } from 'cli-color';

const prismaCommands = [
  {
    title: 'Generate',
    value: 'npx prisma generate',
  },
  {
    title: 'Update DB',
    value: 'npx prisma db push',
  },
  {
    title: 'Run Seed',
    value: 'npx prisma db seed',
  },
] as const;

type CommandType = (typeof prismaCommands)[number]['value'];

export class PrismaCommand extends BaseCommand {
  public execute(program: Command) {
    program
      .command('prisma')
      .description('prisma commands')
      .action(async () => {
        const [base, command] = program.args;

        let existDockerInstances = await this.getDockerServices()
          .then((services: any) => {
            return services;
          })
          .catch((error) => {
            console.error(
              'Docker desktop is not running. Please start Docker Desktop OR Orbstack',
            );
          });

        if (isArray(existDockerInstances) && existDockerInstances.length > 0) {
          const { prismaCommand, extraArg, dockerContainer } = await prompts([
            {
              type: 'select',
              name: 'prismaCommand',
              message: 'Select a command',
              choices: prismaCommands.map((command) => command),
              warn: 'Please select a command',
            },
            {
              type: 'text',
              name: 'extraArg',
              message: 'enter extra arg',
              choices: prismaCommands.map((command) => command),
            },
            {
              type: 'multiselect',
              name: 'dockerContainer',
              message: 'Select a docker container',
              choices: existDockerInstances.map((service) => ({
                title: service,
                value: service,
              })),
            },
          ]);

          this.runCommand(dockerContainer, prismaCommand, extraArg);
        }
      });
  }

  /**
   * Run command
   */
  runCommand(
    dockerContainer: string[],
    prismaCommand: CommandType,
    extraCommandArg: string,
  ) {
    dockerContainer.map((container) => {
      exec(
        `docker-compose exec ${container} ${prismaCommand} ${extraCommandArg ?? ''}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }

          console.log(
            bold(
              `\n/${container}/ container /${prismaCommand}/ command executed successfully) \n ${stdout}`,
            ),
          );
        },
      );
    });
  }

  /**
   * Get docker services
   */
  getDockerServices() {
    return new Promise((resolve, reject) => {
      exec('docker-compose ps --services', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error);
          return;
        }

        const services = stdout.split('\n').filter(Boolean);
        resolve(services);
      });
    });
  }
}
