// function myDecorator(
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor
// ) {
//     console.log(target, propertyKey, descriptor);
// }

// class ExampleClass {
//     @myDecorator
//     method() {}
// }

// const obj = new ExampleClass();

// obj.method();

// //===================================================


// function myDecorator(value: string) {
//     return (
//         target: any,
//         propertyKey: string,
//         descriptor: PropertyDescriptor) => {
//         console.log(value);
//     }
// }


// class ExampleClass {
//     @myDecorator("Hello World")
//     method() {}
// }

// const obj = new ExampleClass();

// obj.method();


//===================================================


function memoize(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor)
{
    const originalMethod = descriptor.value;
    const cache = new Map();

    descriptor.value = function (...args: any[]) {
        const key=args.toString(); // створюємо ключ на основі аргументів

        if (cache.has(key)) {
            console.log(`Знайдено в кеші: ${key}`);
            return cache.get(key);
        } else {
            const result=originalMethod.apply(this, args);
            cache.set(key, result);
            console.log(`Збережено в кеші: ${key}`);
            return result;
        }
    };

    return descriptor;

}

class MathOperations {
    @memoize
    factorial(n: number): number {
        if (n===0 || n===1) {
            return 1;
        } else {
            return n * this.factorial(n-1);
        }
    }
}

const mathOps = new MathOperations();

console.log(mathOps.factorial(5));  // обчислюється і зберігається в кеші результат для 5
console.log(mathOps.factorial(5));  // використовується результат з кешу для 5
console.log(mathOps.factorial(3));  // обчислюється і зберігається в кеші результат для 3
console.log(mathOps.factorial(3));  // використовується результат з кешу для 3
