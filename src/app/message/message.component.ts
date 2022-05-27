import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { Message } from '../services/data.service';
import {DomController, IonTextarea} from "@ionic/angular";
import {timer} from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @ViewChild('ita') ionTextarea!: IonTextarea;
  @Input() message: Message;
  editing = false;

  constructor(private domCtrl: DomController) { }

  ngOnInit() {
  }

  onEdit() {
    this.editing = !this.editing;
    if (this.editing) {
      // wait until ngIf has put textarea in dom
      this.domCtrl.read(() => {
        try {
          // setFocus was successfully called, but didn't work without a delay
          timer(50).subscribe(()=>{
            this.ionTextarea.setFocus().then(()=> {
              console.log("focused");
              // textarea is focused on iPhone, but it did not scroll out from
              // under the on-screen keyboard.
            });
          });
        } catch (e) {
          console.error(JSON.stringify(e,null,2));
        }
      });
    }
  }

}
