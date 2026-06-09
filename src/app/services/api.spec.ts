import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PorscheService } from './api';

// Declaramos las funciones de prueba para evitar que VS Code tire error visual de "Cannot find name"
declare var describe: any;
declare var beforeEach: any;
declare var it: any;
declare var expect: any;

describe('Api', () => {
  let service: PorscheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PorscheService]
    });
    service = TestBed.inject(PorscheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});