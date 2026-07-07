export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying = false;
  private nodes: OscillatorNode[] = [];
  private intervalId: ReturnType<typeof setInterval> | null = null;

  private readonly melody = [
    { note: 523.25, dur: 0.6 },  // C5
    { note: 587.33, dur: 0.4 },  // D5
    { note: 659.25, dur: 0.6 },  // E5
    { note: 783.99, dur: 0.4 },  // G5
    { note: 659.25, dur: 0.3 },  // E5
    { note: 587.33, dur: 0.3 },  // D5
    { note: 523.25, dur: 0.8 },  // C5
    { note: 440.00, dur: 0.6 },  // A4
    { note: 523.25, dur: 0.4 },  // C5
    { note: 587.33, dur: 0.6 },  // D5
    { note: 659.25, dur: 0.8 },  // E5
    { note: 523.25, dur: 0.6 },  // C5
    { note: 440.00, dur: 0.4 },  // A4
    { note: 392.00, dur: 0.6 },  // G4
    { note: 523.25, dur: 0.8 },  // C5
    { note: 587.33, dur: 0.4 },  // D5
    { note: 783.99, dur: 0.6 },  // G5
    { note: 698.46, dur: 0.4 },  // F5
    { note: 659.25, dur: 0.6 },  // E5
    { note: 587.33, dur: 0.4 },  // D5
    { note: 523.25, dur: 0.3 },  // C5
    { note: 587.33, dur: 0.3 },  // D5
    { note: 659.25, dur: 0.6 },  // E5
    { note: 523.25, dur: 0.6 },  // C5
    { note: 440.00, dur: 0.8 },  // A4
    { note: 392.00, dur: 0.6 },  // G4
    { note: 440.00, dur: 0.4 },  // A4
    { note: 523.25, dur: 0.6 },  // C5
    { note: 587.33, dur: 0.8 },  // D5
    { note: 523.25, dur: 0.6 },  // C5
    { note: 440.00, dur: 0.4 },  // A4
    { note: 392.00, dur: 1.2 },  // G4
  ];

  private readonly chords = [
    [261.63, 329.63, 392.00],  // Cmaj
    [293.66, 369.99, 440.00],  // Dmin
    [329.63, 415.30, 493.88],  // Emaj
    [261.63, 329.63, 392.00],  // Cmaj
    [220.00, 277.18, 329.63],  // Amin
    [196.00, 246.94, 293.66],  // Gmaj
    [261.63, 329.63, 392.00],  // Cmaj
    [196.00, 246.94, 293.66],  // Gmaj
  ];

  private melodyIndex = 0;
  private chordIndex = 0;
  private timeSinceLastChord = 0;

  async init() {
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.15;
    this.masterGain.connect(this.ctx.destination);

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.masterGain.connect(this.analyser);
  }

  private playNote(freq: number, startTime: number, duration: number, type: OscillatorType = "sine", gainValue = 0.12) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.05);
    gain.gain.setValueAtTime(gainValue, startTime + duration - 0.1);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private scheduleNext() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;
    const note = this.melody[this.melodyIndex % this.melody.length];

    this.playNote(note.note, now, note.dur, "sine", 0.08);

    const chord = this.chords[this.chordIndex % this.chords.length];
    chord.forEach((freq) => {
      this.playNote(freq / 2, now, note.dur * 1.5, "triangle", 0.04);
    });

    this.melodyIndex++;
    this.timeSinceLastChord += note.dur;
    if (this.timeSinceLastChord >= 4) {
      this.chordIndex++;
      this.timeSinceLastChord = 0;
    }

    const delay = note.dur * 1000;
    this.intervalId = setTimeout(() => this.scheduleNext(), delay);
  }

  start() {
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.melodyIndex = 0;
    this.chordIndex = 0;
    this.timeSinceLastChord = 0;
    this.scheduleNext();
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  setVolume(value: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = value * 0.3;
    }
  }

  getAnalyserData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(0);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  destroy() {
    this.stop();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}
