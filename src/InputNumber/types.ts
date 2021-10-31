export interface IInputNumberProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur' | 'onFocus'> {
  styles?: React.CSSProperties;
  locales?: string | string[];
  formatOptions?: Intl.NumberFormatOptions;
  zeroWhenEmpty?: boolean;
  parser?: 'parseFloat' | 'parseInt';
  onFocus?: (value: string | number, event?: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (value: string | number, event?: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (value: string | number, event?: React.ChangeEvent<HTMLInputElement>) => void;
}
