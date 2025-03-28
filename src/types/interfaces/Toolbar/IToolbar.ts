export interface IToolbar {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  width?: number;
  height?: number;
}
