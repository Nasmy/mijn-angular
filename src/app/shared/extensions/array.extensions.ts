/*export {};

declare global {
   interface Array {
    asyncForEach<T>(array: Array<T>, callback: (item: T, index: number);

   }
}*/

export async function asyncForEach<T>(array: Array<T>, callback: (item: T, index: number) => Promise<void>) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index);
    }
}
