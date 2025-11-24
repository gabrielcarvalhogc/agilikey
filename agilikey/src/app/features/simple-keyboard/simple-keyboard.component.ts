import { Component, ViewEncapsulation, AfterViewInit } from "@angular/core";
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-simple-keyboard',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [],
  templateUrl: './simple-keyboard.component.html',
  styleUrls: ['./simple-keyboard.component.scss']
})
export class SimpleKeyboardComponent implements AfterViewInit {
  value = "";
  keyboard!: Keyboard;

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      physicalKeyboardHighlight: true,
      theme: "hg-theme-default hg-layout-default myTheme",
      layout: {
        default: [
          "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "{tab} q w e r t y u i o p ' [",
          "{lock} a s d f g h j k l ç ~ ]",
          String.raw`{shift} \ z x c v b n m , . ; / {shift}`,
          "Ctrl Alt {space} Alt Ctrl"
        ],
        shift: [
          "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
          "{tab} Q W E R T Y U I O P { }",
          '{lock} A S D F G H J K L : " |',
          "{shift} Z X C V B N M < > ? {shift}",
          "Ctrl Alt {space} Alt Ctrl"
        ]
      },
      display: {
        "{enter}": "Enter ↵",
        "{bksp}": "⌫",
        "{shift}": "Shift",
        "{tab}": "Tab ⇥",
        "{lock}": "Caps",
        "{space}": " "
      },
      buttonTheme: [
        {
          class: "dedo-minimo",
          buttons: "` 1 {tab} q {lock} a {shift} \\ z Ctrl Alt 0 - = {bksp} p ' [ ç ~ ] {enter} ; / {shift}"
        },
        {
          class: "anelar",
          buttons: "2 w s x 9 o l ."
        },
        {
          class: "dedo-medio",
          buttons: "3 e d c 8 i k ,"
        },
        {
          class: "indicador-esquerdo",
          buttons: "4 5 r t f g v b"
        },
        {
          class: "indicador-direito",
          buttons: "6 7 y u h j n m"
        },
        {
          class: "polegar",
          buttons: "{space}"
        },
        { class: "wide-space", buttons: "{space}" },
        { class: "wide-bksp", buttons: "{bksp}" },
        { class: "wide-enter", buttons: "{enter}" },
        { class: "wide-shift", buttons: "{shift}" },
        { class: "wide-tab", buttons: "{tab}" },
        { class: "wide-lock", buttons: "{lock}" }
      ]
    });
  }

  onChange = (input: string) => {
    this.value = input;
  };

  onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
}
