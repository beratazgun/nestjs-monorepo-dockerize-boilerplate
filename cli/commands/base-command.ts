import { Command } from 'commander';

export abstract class BaseCommand {
  public abstract execute(program: Command): void;
}
