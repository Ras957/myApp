import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TranslateModule } from '@ngx-translate/core';
import { UiComponent } from '../common/ui/ui.component';
import { NewPage } from '../modals/new/new.page';

@NgModule({
  entryComponents:[NewPage],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
  ],
  declarations: [Tab1Page, NewPage],
  providers: [UiComponent],

})
export class Tab1PageModule {}
