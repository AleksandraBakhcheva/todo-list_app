export function autobind(
  _target: any,
  _name: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalMethod.bind(this);
    },
  };
  return newDescriptor;
}
