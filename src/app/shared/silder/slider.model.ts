export interface SliderConfig {
  range: {
    min: number;
    max: number;
  };
  connect: boolean;
  step: number;
  pips: {
    mode: string;
    density: number;
  };
  tooltips: boolean;
  selectionRange: Array<number>;
}
