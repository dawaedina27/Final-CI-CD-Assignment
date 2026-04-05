function greet(name) {
  return `Hello, ${name}`;
}

test('greet function works', () => {
  expect(greet('World')).toBe('Hello, World');
});