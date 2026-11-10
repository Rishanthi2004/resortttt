// Web Audio API ambient sound generator for serene mountain sanctuary atmosphere (gentle wind breeze & spring trickle)

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private timer: number | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtxClass();
  }

  public start(): boolean {
    try {
      this.init();
      if (!this.ctx) return false;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // Pink noise generator for gentle alpine wind
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoiseNode = this.ctx.createBufferSource();
      whiteNoiseNode.buffer = noiseBuffer;
      whiteNoiseNode.loop = true;

      // Low pass filter to create a warm, deep forest canopy wind
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      // Gentle LFO to simulate wind gusts
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      whiteNoiseNode.connect(filter);
      filter.connect(this.masterGain);
      whiteNoiseNode.start();

      this.isRunning = true;
      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    try {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'running') {
          this.ctx.suspend();
        }
        this.isRunning = false;
      }, 1200);
    } catch {
      this.isRunning = false;
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      return this.start();
    }
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const ambientAudio = new AmbientAudioEngine();
