import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PengingatBimbinganPage } from './pengingat-bimbingan.page';

describe('PengingatBimbinganPage', () => {
  let component: PengingatBimbinganPage;
  let fixture: ComponentFixture<PengingatBimbinganPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PengingatBimbinganPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PengingatBimbinganPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
