function formatString(input: string, toUpper?: boolean): string | undefined {
  if (!input) return undefined;
  if (toUpper === false) return input.toLowerCase();
  return input.toUpperCase();
}

function filterByRating(
  items: { title: string; rating: number }[]
): { title: string; rating: number }[] {

    return items.filter(item => item.rating > 4);
}

function concatenateArrays<T>(...arrays: T[][]): T[]{
    return arrays.flat()
}

interface IVehicle{
    make: string,
    year: number,
    model?: string
}

class Vehicle implements IVehicle {
    make: string;
    year: number;

    constructor(make: string, year: number) {
        this.make = make;
        this.year = year;
    }
    getInfo(): string {
        return `Make: ${this.make}, Year: ${this.year}`;
    }


}



class Car extends Vehicle {
    model?: string;
    constructor(make: string,  year: number, model: string){
        super(make,year)
        this.model = model
    }
    getModel(): string {
        return `Model: ${this.model}`;
    }
}


function processValue(value: string | number): number | undefined {

    if (typeof value === 'string') return value.length;
    if(typeof value === 'number') return value * 2
    return undefined;
}



interface Product {
    name: string;
    price: number;
  }
  
  function getMostExpensiveProduct(products: Product[]): Product | null {
    if (products.length === 0) return null;
    return products.reduce((prev, current) => (prev.price > current.price ? prev : current));
  }

 
  enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
  }
  
  function getDayType(day: Day): string {
    if (day === Day.Sunday) return 'Sunday';
    return 'Weekday';
  }


  async function squareAsync(n: number): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (n < 0) {
          reject(new Error("Negative number not allowed"));
        } else {
          resolve(n * n);
        }
      }, 10);
    });
  }
  
  squareAsync(4).then(console.log);         // Output: 16
  squareAsync(-3).catch(console.error);     // Output: Error: Negative number not allowed
  