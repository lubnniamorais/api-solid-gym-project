import { Gym } from '@prisma/client';

import { GymsRepository } from '@/repositories/gyms-repository';

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[];
}

class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchManyByQuery(query, page);

    return { gyms };
  }
}

export { SearchGymsUseCase };
