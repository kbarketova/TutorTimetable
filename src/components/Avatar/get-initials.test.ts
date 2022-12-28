import {getInitials} from './get-initials';

describe('get-initials', () => {
  it('is a function', () => {
    expect(typeof getInitials).toBe('function');
  });
  it('returns empty string, if both arguments are empty strings', () => {
    expect(getInitials('', '')).toEqual('');
  });
  it('returns one character, if name is defined', () => {
    expect(getInitials('Марина')).toEqual('М');
  });
  it('returns one character, if last name is defined', () => {
    expect(getInitials('', 'Денисова')).toEqual('Д');
  });
  it('returns initials, if full name is defined', () => {
    expect(getInitials('Марина', 'Денисова')).toEqual('М Д');
  });
});
