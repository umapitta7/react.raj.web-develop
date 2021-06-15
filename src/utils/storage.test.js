import { getInLocal, setInLocal } from './storage';

describe('Local-storage test', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should be able set and get from localStorage', () => {
    const KEY = 'foo';
    const VALUE = 'bar';
    setInLocal(KEY, VALUE);
    expect(JSON.parse(getInLocal(KEY))).toBe(VALUE);
  });

  it('should return false if we can find something in localStorage', () => {
    const KEY = 'foo';
    expect(getInLocal(KEY)).toBeNull();
  });
});
