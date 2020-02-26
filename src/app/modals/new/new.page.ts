import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  private todo : FormGroup;

  constructor(private modal:ModalController,
    private translate: TranslateService,
    private formBuilder: FormBuilder,) {

     }

  ngOnInit() {
  }

  async closeModal(){
    return await this.modal.dismiss();
  }

}
