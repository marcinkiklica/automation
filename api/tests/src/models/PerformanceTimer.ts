export class PerformanceTimer  {
  private startTime: number = 0;

  start(): void {
    this.startTime = Date.now();
  }

  elapsed(): number {
    if (this.startTime === 0) {
      throw new Error('Timer not started.');
    }
    return Date.now() - this.startTime;
  }
}