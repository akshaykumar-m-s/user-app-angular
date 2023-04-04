import { WordCasePipe } from './word-case.pipe';

describe('WordCasePipe', () => {
  it('create an instance', () => {
    const pipe = new WordCasePipe();
    expect(pipe).toBeTruthy();
  });
});
