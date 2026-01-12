import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Helpers } from '../helpers/helpers';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  localizationInputString: string = '';
  localizationOutputString?: string;
  localizationOutputCode?: string;
  camelCaseOutput?: string;
  camelCaseCode?: string;
  copiedType: 'string' | 'code' | 'camelCase' | 'camelCaseCode' | null = null;
  
  convertToLocalizationString() {
    if(this.localizationInputString.trim().length == 0) {
      this.localizationOutputString = undefined;
      this.localizationOutputCode = undefined;
      this.camelCaseOutput = undefined;
      this.camelCaseCode = undefined;
      return;
    }
    
    this.localizationOutputString = Helpers.toLocalizedString(this.localizationInputString);
    this.localizationOutputCode = `static const String ${Helpers.toLocalizedString(this.localizationInputString, '_')} = ${Helpers.toLocalizedString(this.localizationInputString)};`;
    
    this.camelCaseOutput = Helpers.toCamelCase(this.localizationInputString);
    this.camelCaseCode = `static const String ${Helpers.toCamelCase(this.localizationInputString)} = ${Helpers.toLocalizedString(this.localizationInputString)};`;
  }

  async copyToClipboard(text: string, type: 'string' | 'code' | 'camelCase' | 'camelCaseCode'): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copiedType = type;
    } catch (err) {
      console.error('Failed to copy text:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.body.removeChild(textArea);
    }
  }
}
