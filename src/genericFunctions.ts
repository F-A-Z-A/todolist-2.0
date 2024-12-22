export const TestGenericFunction = () => {
  // -------------------------------------------------------------------------------------------
  // function updateArray<T>(arr: T[], key: T) {
  //   return arr.includes(key) ? arr : [...arr, key]
  // }
  //
  // // Строки
  // const stringArray = ["apple", "banana", "cherry"]
  // const result1 = updateArray(stringArray, "banana") // ['apple', 'banana', 'cherry']
  // console.log(result1)
  // const result2 = updateArray(stringArray, "date") // ['apple', 'banana', 'cherry', 'date']
  // console.log(result2)
  // console.log(stringArray)
  //
  // // Числа
  // const numberArray = [1, 2, 3]
  // const result3 = updateArray(numberArray, 2) // [1, 2, 3]
  // console.log(result3)
  // const result4 = updateArray(numberArray, 4) // [1, 2, 3, 4]
  // console.log(result4)
  // console.log(numberArray)
  // -------------------------------------------------------------------------------------------
  // const mapArray = <T, K>(arr: T[], foo: (el: T) => K) => {
  //   return arr.map((el) => foo(el))
  // }
  //
  // // Пример 1: Преобразование чисел в строки
  // const numbers = [1, 2, 3, 4]
  // const transformNumberToString = (num: number) => `Number: ${num}`
  //
  // const result = mapArray(numbers, transformNumberToString)
  // console.log(result) // ["Number: 1", "Number: 2", "Number: 3", "Number: 4"]
  //
  // // Пример 2: Преобразование строк в их длины
  // const words = ["hello", "world", "typescript"]
  // const getLength = (word: string) => word.length
  //
  // const lengthResults = mapArray(words, getLength)
  // console.log(lengthResults) // [5, 5, 10]
  //
  // // Пример 3: Преобразование объектов в строки
  // type Person = { name: string; age: number }
  // const people: Person[] = [
  //   { name: "Alice", age: 25 },
  //   { name: "Bob", age: 30 },
  // ]
  // const toDescription = (person: Person) => `${person.name} is ${person.age} years old`
  //
  // const descriptions = mapArray(people, toDescription)
  // console.log(descriptions) // ["Alice is 25 years old", "Bob is 30 years old"]
  // -------------------------------------------------------------------------------------------
}
