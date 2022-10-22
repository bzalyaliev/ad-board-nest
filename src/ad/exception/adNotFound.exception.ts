
import { NotFoundException } from '@nestjs/common';

class AdNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Ad with id ${id} not found`);
  }
}


export default AdNotFoundException;