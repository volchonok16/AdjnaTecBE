import { UpdateDocumentPathDto } from '../../dto/update-document-path.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DocumentRepository } from '../../repositories/document.repository';

export class UpdateDocumentPathCommand {
  constructor(public readonly dto: UpdateDocumentPathDto) {}
}

@CommandHandler(UpdateDocumentPathCommand)
export class UpdateDocumentPathCommandHandler
  implements ICommandHandler<UpdateDocumentPathCommand, boolean>
{
  constructor(private readonly documentRepository: DocumentRepository) {}
  async execute({ dto }: UpdateDocumentPathCommand): Promise<boolean> {
    return this.documentRepository.updateDocumentPath(dto);
  }
}
