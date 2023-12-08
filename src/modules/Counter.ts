import Quill from "quill";

type CounterOptions = {
  container: string;
  unit: string;
  max: number;
};

class Counter {
  private quill: Quill;
  private options: CounterOptions;
  private counterContainer: HTMLElement;

  constructor(quill: Quill, options: CounterOptions) {
    this.quill = quill;
    this.options = options;
    this.counterContainer = document.querySelector<HTMLElement>(
      options.container
    )!;
    quill.on("text-change", this.update.bind(this));
    this.update();
  }

  calculate() {
    let text = this.quill.getText();
    if (this.options.unit == "word") {
      text = text.trim();
      return text.length > 0 ? text.split(/\s+/).length : 0;
    } else {
      return text.length;
    }
  }

  update() {
    let length = this.calculate();
    this.counterContainer.innerText = `${length}/${this.options.max} ${this.options.unit}s`;
  }
}

export default Counter;
