import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompoundComponent } from './show-compound.component';

describe('ShowCompoundComponent', () => {
  let component: ShowCompoundComponent;
  let fixture: ComponentFixture<ShowCompoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCompoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
