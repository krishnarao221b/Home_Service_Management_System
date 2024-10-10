import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input!: ElementRef;
  @Input() type = 'text';
  @Input() label!: string;

  // These two methods are ControlValueAccessor methods, they will be set by registerOnChange/registerOnTouched
  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    const validators = control!.validator ? [control!.validator] : [];
    const asyncValidators = control!.asyncValidator ? [control!.asyncValidator] : [];
    control!.setValidators(validators);
    control!.setAsyncValidators(asyncValidators);
    control!.updateValueAndValidity();
  }

  // Trigger the registered onChange when input value changes
  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onChange(input.value);  // Now passing the value as expected by registerOnChange
  }

  // ControlValueAccessor interface methods
  writeValue(value: any): void {
    this.input.nativeElement.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.input.nativeElement.disabled = isDisabled;
  }
}
